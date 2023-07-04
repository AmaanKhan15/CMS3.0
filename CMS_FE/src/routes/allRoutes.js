import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
// import Dashboard from "../pages/Dashboard/index"
import Dashboard from "../../src/components/Dashboard/index.jsx"

//Customer
import CustomerList from "../pages/Customer/index"
import CustomerAdd from "../pages/Customer/Add/index"
import StoreList from "../pages/Customer/Stores/Listindex"
import AddStore from "../pages/Customer/Stores/Add/StoreWizard"
import MerchandList from "../pages/Customer/Merchandiser/Listindex"
import MerchandAdd from "../pages/Customer/Merchandiser/Add/MerchandWizard"
import PromotorList from "../pages/Customer/Promotor/Listindex"
import PromotorAdd from "../pages/Customer/Promotor/Add/MerchandWizard"
import SupervisorAdd from "../pages/Customer/Supervisor/Add/SupervisorWizard"
import SupervisorList from "../pages/Customer/Supervisor/Listindex"
import PromotorReport from "../pages/Customer/Reports/Promotor/PromoterDaily/DailyReport"
import PromotorReportDetails from "../pages/Customer/Reports/Promotor/SinglePromotor"
import PromotorReportDetailsAll from "../pages/Customer/Reports/Promotor/storeCompare"
import MerchandReport from "../pages/Customer/Reports/Merchand/DailyReport/dailyrepo"
import MerchandReportDetails from "../pages/Customer/Reports/Merchand/SingleMerchand"
import MerchandReportDetailsAll from "../pages/Customer/Reports/Merchand/AllMerchandRepo"
import AllStoreReport from "../pages/Customer/Reports/Stores/AllStoresRepo"
import AssignedPromotor from "../pages/Customer/CustomerListPages/assignedPromotor"
import UnAssignedPromotor from "../pages/Customer/CustomerListPages/createNew/assignNewPromotor"
import AssignedMarchand from "../pages/Customer/CustomerListPages/assignedMerchand"
import UnAssignedMarchand from "../pages/Customer/CustomerListPages/createNew/assignNewMarchand"
import SingleMerchanddata from "../pages/Customer/Reports/Merchand/SingleMerchand"
import AssignedStore from "../pages/Customer/CustomerListPages/assignedStores"
import AssignedSKU from "../pages/Customer/CustomerListPages/assignedSKU"
import UnAssignedStore from "../pages/Customer/CustomerListPages/createNew/assignNewStore"
import AssignedTaraget from "../pages/Customer/CustomerListPages/createNew/assignTarget"
import AssignNewSKU from "../pages/Customer/CustomerListPages/createNew/assignNewSKU"

import PromotorCompare from "../pages/Customer/Reports/Promotor/promotorCompare"
import PromotorPerform from "../pages/Customer/Reports/Promotor/promotorPerform"
import PromotorSales from "../pages/Customer/Reports/Promotor/promotorSales"
import PromotorAmt from "../pages/Customer/Reports/Promotor/promotorAmt"
import CustomerDash from "../pages/CustomerModule/Dashboard/index"
import AppleCustomerDash from "../pages/AppleCustomer/Dashboard/index"
// import SupervisorDash from "../pages/SupervisorModule/Dashboard/index"

import ShareMarket from "../pages/Customer/Reports/Merchand/ShareMarket/shareMarket"
import ProductAvialable from "../pages/Customer/Reports/Merchand/productAvaialability/productavail"
import UnavailableProduct from "../pages/Customer/Reports/Merchand/UnavialableStock/unavialStock"
import OutofStock from "../pages/Customer/Reports/Merchand/OutofStock"
import DamageStock from "../pages/Customer/Reports/Merchand/DamageStock/damageStock"
import NearExpiray from "../pages/Customer/Reports/Merchand/NearExpiray/nearExpiray"
import LoginMerchand from "../pages/Customer/Reports/Login/merchandLoginrep"
import LoginPromotor from "../pages/Customer/Reports/Login/promotorlogonrep"
import MerchandGeneral from "../pages/Customer/Reports/Merchand/DailyGeneral/dailyrepo"
import EditMerchand from "../pages/Customer/Merchandiser/Add/EditMerchand"
import EditPromotor from "../pages/Customer/Promotor/Add/EditPromotor"
import EditSupervisor from "../pages/Customer/Supervisor/Add/EditSupervisor"
import EditStore from "../pages/Customer/Stores/Add/EditStore"
import CustomerDetail from "../pages/Customer/CutomerDetail"

//Add Customer Details
import CustomerStep1Deatils from "../pages/Customer/Add/Customer/CustomerWizard"
import CustomerStep2Deatils from "../pages/Customer/Add/Store/StoreWizard"
import CustomerStep3Deatils from "../pages/Customer/Add/SKU/SKUWizard"
import CustomerStep4Deatils from "../pages/Customer/Add/Merchandiser/MerchandWizard"
import CustomerStep5Deatils from "../pages/Customer/Add/Promotor/PromotorWizard"
import CustomerStep6Deatils from "../pages/Customer/Add/Supervisor/supervisorWizard"

//Customer
import NearExpirayCustsomer from "../pages/CustomerModule/Reports/SKU/nearExpiray"
import UnavailableSKUCustomer from "../pages/CustomerModule/Reports/SKU/unavailableSku"
import CustomerLibrary from "../pages/CustomerModule/Reports/SKU/Collecteddata"
import CustomerProLogin from "../pages/CustomerModule/Reports/Login/promotorlogonrep"
import CustomerMerLogin from "../pages/CustomerModule/Reports/Login/merchandLoginrep"
import SalesUnitRepo from "../pages/CustomerModule/Reports/Promotor/SalesUnitRepo/SalesUnit"
import CitySalesUnitRepo from "../pages/CustomerModule/Reports/Promotor/CitySalesRepo/citysalesUnit"
import PromoCompareRepo from "../pages/CustomerModule/Reports/Promotor/PromoCompare/promoCompare"
import StoreCompareRepo from "../pages/CustomerModule/Reports/Promotor/StoreCompare/storeCompare"
import PromotorWeekRepo from "../pages/CustomerModule/Reports/Promotor/PromotorWeekly/promoWeek"
import PromotorDailyRepo from "../pages/CustomerModule/Reports/Promotor/DailyPerformance/promoDaily"

//Apple Customer
import AppleNearExpirayCustsomer from "../pages/AppleCustomer/Reports/SKU/nearExpiray"
import AppleUnavailableSKUCustomer from "../pages/AppleCustomer/Reports/SKU/unavailableSku"
import AppleCustomerLibrary from "../pages/AppleCustomer/Reports/SKU/Collecteddata"
import AppleCustomerProLogin from "../pages/AppleCustomer/Reports/Login/promotorlogonrepbkp"
import AppleCustomerMerLogin from "../pages/AppleCustomer/Reports/Login/merchandLoginrepbkp"
import AppleSalesUnitRepo from "../pages/AppleCustomer/Reports/Promotor/SalesUnitRepo/SalesUnit"
import AppleCitySalesUnitRepo from "../pages/AppleCustomer/Reports/Promotor/CitySalesRepo/citysalesUnit"
import ApplePromoCompareRepo from "../pages/AppleCustomer/Reports/Promotor/PromoCompare/promoCompare"
import AppleStoreCompareRepo from "../pages/AppleCustomer/Reports/Promotor/StoreCompare/storeCompare"
import ApplePromotorWeekRepo from "../pages/AppleCustomer/Reports/Promotor/PromotorWeekly/promoWeek"
import ApplePromotorDailyRepo from "../pages/AppleCustomer/Reports/Promotor/DailyPerformance/promoDaily"

//Supervisor
import NearExpiraySuper from "../pages/SupervisorModule/Reports/SKU/nearExpiray"
import UnavailableSKUSuper from "../pages/SupervisorModule/Reports/SKU/unavailableSku"
import SuperLibrary from "../pages/SupervisorModule/Reports/SKU/Collecteddata"
import SuperProLogin from "../pages/SupervisorModule/Reports/Login/promotorlogonrep"
import SuperMerLogin from "../pages/SupervisorModule/Reports/Login/merchandLoginrep"
import SalesUnitRepoSuper from "../pages/SupervisorModule/Reports/Promotor/SalesUnitRepo/SalesUnit"
import CitySalesUnitRepoSuper from "../pages/SupervisorModule/Reports/Promotor/CitySalesRepo/citysalesUnit"
import PromoCompareRepoSuper from "../pages/SupervisorModule/Reports/Promotor/PromoCompare/promoCompare"
import StoreCompareRepoSuper from "../pages/SupervisorModule/Reports/Promotor/StoreCompare/storeCompare"
import PromotorWeekRepoSuper from "../pages/SupervisorModule/Reports/Promotor/PromotorWeekly/promoWeek"
import PromotorDailyRepoSuper from "../pages/SupervisorModule/Reports/Promotor/DailyPerformance/promoDaily"

import MerchandReportSuper from "../pages/SupervisorModule/Reports/Merchand/DailyReport/dailyrepo"
import ShareMarketSuper from "../pages/SupervisorModule/Reports/Merchand/ShareMarket/shareMarket"
import ProductAvialableSuper from "../pages/SupervisorModule/Reports/Merchand/productAvaialability/productavail"
import UnavailableProductSuper from "../pages/SupervisorModule/Reports/Merchand/UnavialableStock/unavialStock"
import OutofStockSuper from "../pages/SupervisorModule/Reports/Merchand/OutofStock"
import DamageStockSuper from "../pages/SupervisorModule/Reports/Merchand/DamageStock/damageStock"
import NearExpirayMerchandSuper from "../pages/SupervisorModule/Reports/Merchand/NearExpiray/nearExpiray"
// import LoginMerchandSuper from "../pages/SupervisorModule/Reports/Login/merchandLoginrep";
// import LoginPromotorSuper from "../pages/SupervisorModule/Reports/Login/promotorlogonrep";
import MerchandGeneralSuper from "../pages/SupervisorModule/Reports/Merchand/DailyGeneral/dailyrepo"
import HrDashboard from "../pages/HrModule/Dashboard/index"
import HrPromotor from "../pages/HrModule/ApplicationList/Promotor/Listindex"
import HrMerchandiser from "../pages/HrModule/ApplicationList/Merchand/Listindex"
import HrShortListed from "../pages/HrModule/ShortListed/Listindex"

const data = JSON.parse(localStorage.getItem("authUser"))
console.log("From routes", data)

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/customer/dashboard", component: CustomerDash },
  { path: "/applecustomer/dashboard", component: AppleCustomerDash },
  // {path:"/supervisor/dashboard",component:SupervisorDash},

  //Customer
  { path: "/customer-list", component: CustomerList },
  { path: "/customer-add", component: CustomerAdd },
  { path: "/customer-deatils", component: CustomerDetail },
  { path: "/customer-step1", component: CustomerStep1Deatils },
  { path: "/customer-step2", component: CustomerStep2Deatils },
  { path: "/customer-step3", component: CustomerStep3Deatils },
  { path: "/customer-step4", component: CustomerStep4Deatils },
  { path: "/customer-step5", component: CustomerStep5Deatils },
  { path: "/customer-step6", component: CustomerStep6Deatils },

  //Store
  { path: "/store-list", component: StoreList },
  { path: "/store-add", component: AddStore },
  { path: "/store-edit", component: EditStore },

  //Merchand
  { path: "/merchand-list", component: MerchandList },
  { path: "/merchand-add", component: MerchandAdd },
  { path: "/merchand-edit", component: EditMerchand },

  //Promotor
  { path: "/promotor-list", component: PromotorList },
  { path: "/promotor-add", component: PromotorAdd },
  { path: "/promotor-edit", component: EditPromotor },

  //Supervisor
  { path: "/supervisor-list", component: SupervisorList },
  { path: "/supervisor-add", component: SupervisorAdd },
  { path: "/supervisor-edit", component: EditSupervisor },

  //Reports
  { path: "/promotor-report", component: PromotorReport },
  { path: "/promotor-report/detail", component: PromotorReportDetails },
  { path: "/store-compare/report", component: PromotorReportDetailsAll },
  { path: "/all-store-report", component: AllStoreReport },
  { path: "/merchand-report", component: MerchandReport },
  { path: "/merchand-report/detail", component: MerchandReportDetails },
  { path: "/merchand-report/all", component: MerchandReportDetailsAll },
  { path: "/all-store-report", component: AllStoreReport },
  { path: "/single-merchand/report", component: SingleMerchanddata },

  //Assigned Promotor
  { path: "/assignedpromotor/list", component: AssignedPromotor },
  { path: "/unassignedpromotor/list", component: UnAssignedPromotor },
  { path: "/assign-target", component: AssignedTaraget },
  { path: "/assign-sku", component: AssignNewSKU },
  { path: "/promotor-compare/report", component: PromotorCompare },
  { path: "/promotor-perform/report", component: PromotorPerform },
  { path: "/promotor-sales/report", component: PromotorSales },
  { path: "/promotor-Amt/report", component: PromotorAmt },

  //Assigned Merchandiser
  { path: "/assignedmerchand/list", component: AssignedMarchand },
  { path: "/unassignedmerchand/list", component: UnAssignedMarchand },
  { path: "/merchand-genaral/report", component: MerchandGeneral },

  //Merchand Reports
  { path: "/merchand-sharemarket/report", component: ShareMarket },
  { path: "/merchand-productavialable/report", component: ProductAvialable },
  { path: "/merchand-unavialble/report", component: UnavailableProduct },
  { path: "/merchand-outofstock/report", component: OutofStock },
  { path: "/merchand-damagestock/report", component: DamageStock },
  { path: "/merchand-nearexpiray/report", component: NearExpiray },

  //Login Reports

  { path: "/login-report/merchand", component: LoginMerchand },
  { path: "/login-report/promotor", component: LoginPromotor },

  //CustomerModule
  { path: "/customer/near-expiray", component: NearExpirayCustsomer },
  { path: "/customer/unavailable-sku", component: UnavailableSKUCustomer },
  { path: "/customer/library", component: CustomerLibrary },
  {
    path: "/customer/promotor-login-logout/report",
    component: CustomerProLogin,
  },
  {
    path: "/customer/merchand-login-logout/report",
    component: CustomerMerLogin,
  },
  { path: "/customer/promotor-sales/report", component: SalesUnitRepo },
  { path: "/customer/promotor-citysales/report", component: CitySalesUnitRepo },
  { path: "/customer/promotor-compare/report", component: PromoCompareRepo },
  { path: "/customer/store-compare/report", component: StoreCompareRepo },
  { path: "/customer/promotor-week/report", component: PromotorWeekRepo },
  { path: "/customer/promotor-daily/report", component: PromotorDailyRepo },

  //Apple CustomerModule
  { path: "/applecustomer/near-expiray", component: AppleNearExpirayCustsomer },
  {
    path: "/applecustomer/unavailable-sku",
    component: AppleUnavailableSKUCustomer,
  },
  { path: "/applecustomer/library", component: AppleCustomerLibrary },
  {
    path: "/applecustomer/promotor-login-logout/report",
    component: AppleCustomerProLogin,
  },
  {
    path: "/applecustomer/merchand-login-logout/report",
    component: AppleCustomerMerLogin,
  },
  {
    path: "/applecustomer/promotor-sales/report",
    component: AppleSalesUnitRepo,
  },
  {
    path: "/applecustomer/promotor-citysales/report",
    component: AppleCitySalesUnitRepo,
  },
  {
    path: "/applecustomer/promotor-compare/report",
    component: ApplePromoCompareRepo,
  },
  {
    path: "/applecustomer/store-compare/report",
    component: AppleStoreCompareRepo,
  },
  {
    path: "/applecustomer/promotor-week/report",
    component: ApplePromotorWeekRepo,
  },
  {
    path: "/applecustomer/promotor-daily/report",
    component: ApplePromotorDailyRepo,
  },

  //Supervisor Module
  { path: "/supervisor/near-expiray", component: NearExpiraySuper },
  { path: "/supervisor/unavailable-sku", component: UnavailableSKUSuper },
  { path: "/supervisor/library", component: SuperLibrary },
  {
    path: "/supervisor/promotor-login-logout/report",
    component: SuperProLogin,
  },
  {
    path: "/supervisor/merchand-login-logout/report",
    component: SuperMerLogin,
  },
  { path: "/supervisor/promotor-sales/report", component: SalesUnitRepoSuper },
  {
    path: "/supervisor/promotor-citysales/report",
    component: CitySalesUnitRepoSuper,
  },
  {
    path: "/supervisor/promotor-compare/report",
    component: PromoCompareRepoSuper,
  },
  {
    path: "/supervisor/store-compare/report",
    component: StoreCompareRepoSuper,
  },
  {
    path: "/supervisor/promotor-week/report",
    component: PromotorWeekRepoSuper,
  },
  {
    path: "/supervisor/promotor-daily/report",
    component: PromotorDailyRepoSuper,
  },

  {
    path: "/supervisor/merchand-sharemarket/report",
    component: ShareMarketSuper,
  },
  {
    path: "/supervisor/merchand-productavialable/report",
    component: ProductAvialableSuper,
  },
  {
    path: "/supervisor/merchand-unavialble/report",
    component: UnavailableProductSuper,
  },
  {
    path: "/supervisor/merchand-outofstock/report",
    component: OutofStockSuper,
  },
  {
    path: "/supervisor/merchand-damagestock/report",
    component: DamageStockSuper,
  },
  {
    path: "/supervisor/merchand-nearexpiray/report",
    component: NearExpirayMerchandSuper,
  },
  {
    path: "/supervisor/merchand-genaral/report",
    component: MerchandGeneralSuper,
  },
  { path: "/supervisor/merchand-report", component: MerchandReportSuper },
  //Assigned Store
  { path: "/assignedstore/list", component: AssignedStore },
  { path: "/assignedsku/list", component: AssignedSKU },
  { path: "/unassignedstore/list", component: UnAssignedStore },

  //Hr Module
  { path: "/hradmin/dashboard", component: HrDashboard },
  { path: "/hradmin/promoter", component: HrPromotor },
  { path: "/hradmin/merchandiser", component: HrMerchandiser },
  { path: "/hradmin/shortListed", component: HrShortListed },

  // //calendar
  { path: "/calendar", component: Calendar },

  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/auth-lock-screen", component: LockScreen },

  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]
if (data != null) {
  if (data.user_type == "Customer") {
    console.log("I customer Routes", data.user_type)
    userRoutes.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/customer/dashboard" />,
    })
  }
  if (data.user_type == "AppleCustomer") {
    console.log("I customer Routes", data.user_type)
    userRoutes.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/applecustomer/dashboard" />,
    })
  }
  if (data.user_type == "Customer/Merchandiser") {
    console.log("I customer Routes", data.user_type)
    userRoutes.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/customer/dashboard" />,
    })
  }
  if (data.user_type == "Site Admin") {
    console.log("I Siteadmin Routes", data.user_type)
    userRoutes.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/dashboard" />,
    })
  }
  if (data.user_type == "Supervisor") {
    userRoutes.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/supervisor/dashboard" />,
    })
  }
  // }
  // if(data==null){
  // authRoutes.push({ path: "/", exact: true, component: () => <Redirect to="/login" />})
}
export { userRoutes, authRoutes }
