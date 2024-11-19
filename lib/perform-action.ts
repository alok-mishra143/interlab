/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Report = any[]; // Assuming reports are arrays of objects

export function processAndMergeReports(
  paymentReport: Report,
  merchantReport: Report
): Record<string, any[]> {
  try {
    // Process Merchant Report
    const processedMerchantReport = merchantReport
      .filter((row) => row["Transaction Type"] !== "Cancel") // Remove rows with "Cancel"
      .map((row) => ({
        ...row,
        "Transaction Type":
          row["Transaction Type"] === "Refund" ||
          row["Transaction Type"] === "FreeReplacement"
            ? "Return"
            : row["Transaction Type"],
      }));

    // Process Payment Report
    const processedPaymentReport = paymentReport
      .filter((row) => row["Type"] !== "Transfer") // Remove rows with "Transfer"
      .map((row) => ({
        ...row,
        "Payment Type":
          row["Type"] === "Ajdustment" ||
          row["Type"] === "FBA Inventory Fee" ||
          row["Type"] === "Fulfilment Fee Refund" ||
          row["Type"] === "Service Fee"
            ? "Order"
            : row["Type"] === "Refund"
            ? "Return"
            : row["Type"],
        "Transaction Type": "Payment", // Add Transaction Type column with value "Payment"
      }))
      .map((row) => {
        // Remove the original "Type" column
        const { Type, ...rest } = row;
        return rest;
      });

    // Merge Reports
    const mergedReport = [
      ...processedPaymentReport,
      ...processedMerchantReport,
    ];

    // Analyze and group data
    return analyzeAndGroupData(mergedReport);
  } catch (error) {
    throw new Error(`Error processing reports: ${error.message}`);
  }
}

function normalizeKeys(row: Record<string, any>): Record<string, any> {
  return Object.keys(row).reduce((acc, key) => {
    acc[key.toLowerCase()] = row[key];
    return acc;
  }, {} as Record<string, any>);
}

function analyzeAndGroupData(mergedData: any[]): Record<string, any[]> {
  const groupedData: Record<string, any[]> = {
    removalOrderIDs: [],
    returns: [],
    negativePayouts: [],
    orderPaymentReceived: [],
    orderNotApplicableButPaymentReceived: [],
    paymentPending: [],
  };

  // Group data by Order ID
  const orders = mergedData.reduce((acc, row) => {
    const normalizedRow = normalizeKeys(row); // Normalize keys to lowercase
    const orderId = normalizedRow["order id"]; // Case-insensitive access
    if (!orderId) return acc;
    if (!acc[orderId]) acc[orderId] = [];
    acc[orderId].push(normalizedRow); // Ensure normalized rows are stored
    return acc;
  }, {} as Record<string, any[]>);

  // Analyze each order
  for (const [orderId, transactions] of Object.entries(orders)) {
    const isRemovalOrder = orderId.length === 10;
    let hasReturnWithInvoice = false;
    let hasPaymentWithNegativeNetAmount = false;
    let paymentNetAmount: number | null = null;
    let shipmentInvoiceAmount: number | null = null;
    let paymentExists = false;
    let shipmentExists = false;

    // Analyze each transaction within the group
    for (const transaction of transactions) {
      const transactionType = transaction["transaction type"];
      const invoiceAmount = transaction["invoice amount"];
      const netAmount = transaction["net amount"];

      if (transactionType === "Return" && invoiceAmount != null) {
        hasReturnWithInvoice = true;
      }

      if (transactionType === "Payment") {
        if (netAmount < 0) {
          hasPaymentWithNegativeNetAmount = true;
        }
        paymentNetAmount = netAmount;
        paymentExists = true;
      }

      if (transactionType === "Shipment") {
        shipmentInvoiceAmount = invoiceAmount;
        shipmentExists = true;
      }
    }

    // Categorize orders
    if (isRemovalOrder) {
      groupedData.removalOrderIDs.push({ orderId, transactions });
    }

    if (hasReturnWithInvoice) {
      groupedData.returns.push({ orderId, transactions });
    }

    if (hasPaymentWithNegativeNetAmount) {
      groupedData.negativePayouts.push({ orderId, transactions });
    }

    if (paymentExists && shipmentExists && shipmentInvoiceAmount != null) {
      groupedData.orderPaymentReceived.push({ orderId, transactions });
    } else if (paymentExists && shipmentInvoiceAmount == null) {
      groupedData.orderNotApplicableButPaymentReceived.push({
        orderId,
        transactions,
      });
    } else if (!paymentExists && shipmentExists) {
      groupedData.paymentPending.push({ orderId, transactions });
    }
  }

  return groupedData;
}
