interface Dataprops {
  id?: string;
  userId: string;
  removalOrderCount: number;
  returnDetails: number;
  negativePayoutCount: number;
  orderAndPaymentReceivedCount: number;
  orderNotApplicablePaymentReceived: number;
  paymentPendingCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GetDataByIdprops {
  Id: string;
  userId: string;
}
