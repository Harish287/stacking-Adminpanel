import { MdOutlineDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { IoContractSharp } from "react-icons/io5";
import { PiHandWithdraw } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { PiUserListBold } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";


export const menuItemsData = [
  {

    title: " Dashboard",
    url: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "KaitWallet",
    url: "/kaitWallet",
    icon: <IoWalletOutline />,
    submenu: [
      {
        title: "Pending Approval",
        url: "pendingapproval",
      },
  
      {
        title: "Approved",
        url: "approved",
      },
      {
        title: "Rejected",
        url: "rejected",
      },
    ],
  },
  {
    title: "Staking Contract",
    url: "/staking",
    icon: <IoContractSharp />,
    submenu: [
      {
        title: "All Contract",
        url: "allcontract",
      },
  
      {
        title: "Income Account Summary",
        url: "incomeaccountsummary",
      },
      {
        title: "Bonus Account Summary",
        url: "bonusaccountsummary",
      },
      {
        title: "Voucher Receipt Summary",
        url: "voucherreceiptsummary",
      },
      {
        title: "Restack Wallet Summary",
        url: "restackwalletsummary",
      },
      {
        title: "Club Volume",
        url: "clubvolume",
      },
    ],
  },

  {
    title: "Withdrawal",
    url: "/Withdrawal",
    icon: <PiHandWithdraw />,
    submenu: [
      {
        title: "Pending Approval",
        url: "pendingapproval",
      },
  
      {
        title: "Approved",
        url: "approved",
      },
      {
        title: "Rejected",
        url: "rejected",
      },
    ],
  },
  {
    title: "KYC List",
    url: "/kyclist",
    icon: <CiViewList />,
  },
  {
    title: "User List",
    url: "/userlist",
    icon: <PiUserListBold />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <CiSettings />,
    submenu: [
      {
        title: "ICO/STO Setting",
        url: "icostosetting",
      },
      {
        title: "Website Setting",
        url: "websitesetting",
      },
      {
        title: "Referral Setting",
        url: "referralsetting",
      },
      {
        title: "Mailing Setting",
        url: "mailingsetting",
      },
      {
        title: "Payment Methods",
        url: "paymentmethods",
      },
      {
        title: "Manage Pages",
        url: "managepages",
      },
      {
        title: "Application API",
        url: "applicationapi",
      },
      {
        title: "Manage Languages",
        url: "managelanguages",
      },
      {
        title: "System Status",
        url: "systemstatus",
      },
    ],
  },



];
