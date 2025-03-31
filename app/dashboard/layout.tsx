"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ userSubscription, setUserSubscription }}
      >
        <UpdateCreditUsageContext.Provider
          value={{ updateCreditUsage, setUpdateCreditUsage }}
        >
          <div className="bg-slate-100 min-h-screen flex flex-col md:flex-row">
            <div className="md:w-64 w-full md:block md:fixed sticky top-0">
              <SideNav />
            </div>
            <div className="md:ml-64 mx-auto w-full">
              {/* <Header /> */}
              {children}
            </div>
            <div></div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;
