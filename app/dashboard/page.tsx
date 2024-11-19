/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import { processAndMergeReports } from "@/lib/perform-action";
import { insertdata } from "@/lib/supabase-action";

export default function Page() {
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user?.id) {
      setUserId(user.id);
    }
  }, [isSignedIn, user]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      readExcelData(file, setData);
    }
  };

  const readExcelData = (
    file: File,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.length || !merchantData.length) {
      console.error("Both reports must be uploaded.");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const mergedData = processAndMergeReports(paymentData, merchantData);

      // Prepare the length of each array in mergedData for Supabase
      const supabaseData = {
        userId,
        removalOrderCount: mergedData.removalOrderIDs?.length || 0,
        returnDetails: mergedData.returns?.length || 0,
        negativePayoutCount: mergedData.negativePayouts?.length || 0,
        orderAndPaymentReceivedCount:
          mergedData.orderPaymentReceived?.length || 0,
        orderNotApplicablePaymentReceived:
          mergedData.orderNotApplicableButPaymentReceived?.length || 0,
        paymentPendingCount: mergedData.paymentPending?.length || 0,
      };

      const result = await insertdata(supabaseData);
      console.log("Data successfully inserted into Supabase:", result);
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <section className="w-screen min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Excel File Upload
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Report Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="payment-report"
              className="text-sm font-medium text-gray-300"
            >
              Payment Report
            </Label>
            <Input
              id="payment-report"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) =>
                handleFileChange(e, setPaymentReport, setPaymentData)
              }
              className="sr-only"
            />
            <Label
              htmlFor="payment-report"
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-800"
            >
              <Upload className="w-5 h-5 mr-2" />
              {paymentReport ? paymentReport.name : "Choose Payment Report"}
            </Label>
          </div>

          {/* Merchant Report Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="merchant-report"
              className="text-sm font-medium text-gray-300"
            >
              Merchant Report
            </Label>
            <Input
              id="merchant-report"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) =>
                handleFileChange(e, setMerchantReport, setMerchantData)
              }
              className="sr-only"
            />
            <Label
              htmlFor="merchant-report"
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-800"
            >
              <Upload className="w-5 h-5 mr-2" />
              {merchantReport ? merchantReport.name : "Choose Merchant Report"}
            </Label>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
