import { StoreProvider } from "@/hooks/use-cart-store";
import LenisProvider from "@/components/lenis-provider/LenisProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/navbar/Navbar";
import Drawers from "@/components/drawers/Drawers";
import SizeMatrixModal from "@/components/modals/SizeMatrixModal";
import WhatsappConcierge from "@/components/whatsapp/WhatsappConcierge";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <LenisProvider>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Drawers />
        <SizeMatrixModal />
        <WhatsappConcierge />
      </LenisProvider>
    </StoreProvider>
  );
}
