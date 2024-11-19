import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export const insertdata = async (data: Dataprops) => {
  data.id = uuidv4();
  data.createdAt = new Date();
  data.updatedAt = new Date();

  const { error } = await supabase.from("ReportSummary").insert(data);
  if (error) {
    console.log(error);
  }
  console.log("data is inserted sucessfully");
};

export const getdata = async (userId: string) => {
  const { data } = await supabase
    .from("ReportSummary")
    .select("*")
    .eq("userId", userId);

  return data;
};

export const getDataById = async ({ Id, userId }: GetDataByIdprops) => {
  const { data } = await supabase
    .from("ReportSummary")
    .select("*")
    .eq("id", Id)
    .eq("userId", userId);

  return data;
};
