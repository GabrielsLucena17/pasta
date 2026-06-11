import { useState } from "react";
import Home from "./pages/Home.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import MyOrdersPage from "./pages/auth/MyOrdersPage.jsx";
import OrderDetailPage from "./pages/auth/OrderDetailPage.jsx";
import PaymentPage from "./pages/auth/PaymentPage.jsx";
import ProfessionalProfilePage from "./pages/auth/ProfessionalProfilePage.jsx";
import ProposalDetailPage from "./pages/auth/ProposalDetailPage.jsx";
import RegisterAccessStep from "./pages/auth/RegisterAccessStep.jsx";
import RegisterContactStep from "./pages/auth/RegisterContactStep.jsx";
import RegisterDocumentsStep from "./pages/auth/RegisterDocumentsStep.jsx";
import RegisterProfileStep from "./pages/auth/RegisterProfileStep.jsx";
import AccountPage from "./pages/app/AccountPage.jsx";
import AddressCreatePage from "./pages/app/AddressCreatePage.jsx";
import AddressesPage from "./pages/app/AddressesPage.jsx";
import ChatDetailPage from "./pages/app/ChatDetailPage.jsx";
import LoggedHomePage from "./pages/app/LoggedHomePage.jsx";
import MessagesPage from "./pages/app/MessagesPage.jsx";
import NotificationsPage from "./pages/app/NotificationsPage.jsx";
import ProfileEditPage from "./pages/app/ProfileEditPage.jsx";
import AddressStep from "./pages/order/AddressStep.jsx";
import AvailabilityStep from "./pages/order/AvailabilityStep.jsx";
import CategoriesStep from "./pages/order/CategoriesStep.jsx";
import DescriptionStep from "./pages/order/DescriptionStep.jsx";
import PhotosStep from "./pages/order/PhotosStep.jsx";
import ProfessionalAccountPage from "./pages/professional/ProfessionalAccountPage.jsx";
import ProfessionalOrdersPage from "./pages/professional/ProfessionalOrdersPage.jsx";
import ProfessionalServicesPage from "./pages/professional/ProfessionalServicesPage.jsx";
import ProfessionalServiceDetailPage from "./pages/professional/ProfessionalServiceDetailPage.jsx";
import ServiceCreateCoverStep from "./pages/professional/ServiceCreateCoverStep.jsx";
import ServiceCreateDescriptionStep from "./pages/professional/ServiceCreateDescriptionStep.jsx";
import ServiceCreateInfoStep from "./pages/professional/ServiceCreateInfoStep.jsx";
import ServiceCreatePhotosStep from "./pages/professional/ServiceCreatePhotosStep.jsx";

const screens = {
  home: Home,
  categories: CategoriesStep,
  photos: PhotosStep,
  description: DescriptionStep,
  availability: AvailabilityStep,
  address: AddressStep,
  summary: SummaryPage,
  login: LoginPage,
  registerContact: RegisterContactStep,
  registerProfile: RegisterProfileStep,
  registerAccess: RegisterAccessStep,
  registerDocuments: RegisterDocumentsStep,
  myOrders: MyOrdersPage,
  orderDetail: OrderDetailPage,
  professionalProfile: ProfessionalProfilePage,
  proposalDetail: ProposalDetailPage,
  payment: PaymentPage,
  loggedHome: LoggedHomePage,
  notifications: NotificationsPage,
  messages: MessagesPage,
  chatDetail: ChatDetailPage,
  account: AccountPage,
  addresses: AddressesPage,
  addressCreate: AddressCreatePage,
  profileEdit: ProfileEditPage,
  professionalServices: ProfessionalServicesPage,
  professionalServiceDetail: ProfessionalServiceDetailPage,
  serviceCreatePhotos: ServiceCreatePhotosStep,
  serviceCreateInfo: ServiceCreateInfoStep,
  serviceCreateCover: ServiceCreateCoverStep,
  serviceCreateDescription: ServiceCreateDescriptionStep,
  professionalAccount: ProfessionalAccountPage,
  professionalOrders: ProfessionalOrdersPage,
};

const initialOrder = {
  category: "",
  urgent: null,
  photos: [],
  description: "",
  periods: [],
  address: null,
  number: "",
  complement: "",
  status: "Aguardando propostas",
};

const initialAuth = {
  cpf: "",
  fullName: "",
  birthDate: "",
  email: "",
  password: "",
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [loginAudience, setLoginAudience] = useState("client");
  const [editingFromSummary, setEditingFromSummary] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const [auth, setAuth] = useState(initialAuth);
  const [professionalProposal, setProfessionalProposal] = useState(null);
  const [professionalServices, setProfessionalServices] = useState([]);
  const [orderDetailInitialTab, setOrderDetailInitialTab] = useState("details");
  const CurrentScreen = screens[screen];

  function updateOrder(values) {
    setOrder((current) => ({ ...current, ...values }));
  }

  function updateAuth(values) {
    setAuth((current) => ({ ...current, ...values }));
  }

  return (
    <CurrentScreen
      order={order}
      auth={auth}
      loginAudience={loginAudience}
      setScreen={setScreen}
      setLoginAudience={setLoginAudience}
      editingFromSummary={editingFromSummary}
      setEditingFromSummary={setEditingFromSummary}
      updateOrder={updateOrder}
      updateAuth={updateAuth}
      professionalProposal={professionalProposal}
      setProfessionalProposal={setProfessionalProposal}
      professionalServices={professionalServices}
      setProfessionalServices={setProfessionalServices}
      orderDetailInitialTab={orderDetailInitialTab}
      setOrderDetailInitialTab={setOrderDetailInitialTab}
    />
  );
}
