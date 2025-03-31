"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { Star } from "lucide-react";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState(10000);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );
  useEffect(() => {
    user && GetData();
    user && IsUserSubscribe();
  }, [user]);

  useEffect(() => {
    user && GetData();
  }, [updateCreditUsage && user]);

  const GetData = async () => {
    {
      /* @ts-ignore */
    }
    const result: HISTORY[] = await db
      .select()
      .from(AIOutput)
      .where(
        eq(
          AIOutput.createdBy,
          user?.primaryEmailAddress?.emailAddress as string
        )
      );
    console.log(result);
    GetTotalUsage(result);
  };

  const IsUserSubscribe = async () => {
    {
      /* @ts-ignore */
    }
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(
          UserSubscription.email,
          user?.primaryEmailAddress?.emailAddress as string
        )
      );
    console.log(result);
    if (result.length > 0) {
      setUserSubscription(true);
      setMaxWords(1000000);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });

    setTotalUsage(total);
    console.log(total);
  };

  return (
    <div className="md:m-5 flex justify-between md:flex-col">
      <div className="md:bg-primary text-primary md:text-white p-3 rounded-lg flex flex-col">
        <h2 className="font-medium md:block">Credits</h2>
        <div className="h-2 bg-violet-200 md:bg-[#9981f9] w-full rounded-full md:mt-3">
          <div
            className="h-2 bg-primary md:bg-white rounded-full"
            style={{
              width:
                totalUsage / maxWords > 1
                  ? 100 + "%"
                  : (totalUsage / maxWords) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className="md:text-sm text-xs md:my-2">
          {totalUsage}/{maxWords} credit used
        </h2>
      </div>
      <Button
        variant={"secondary"}
        className="md:w-full w-1/4 md:my-3 md:block text-primary"
      >
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
