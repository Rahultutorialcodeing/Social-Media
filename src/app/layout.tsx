import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import BorderLoder from "./(component)/BorderLoder";
import { Providers } from "@/Redux-Toolkit/Providers";
import InternetStatus from "./(component)/InternetStatus";
import Sidebar from "./(common)/Sidebar";
import Following from "./(component)/(Following-sec)/Following";
import Loder from "./(component)/Loder";
import ProfileShow from "./(component)/(profile-show)/profile";
import Remover from "./(component)/(Remover-photo)/Remover";
import PostSec from "./(component)/(Post-sec)/post";
import SingBorderLoder from "./(component)/SingBorderLoder";


export const metadata: Metadata = {
  title: "Ram_Bajrangi",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en"  >
      <body cz-shortcut-listen="true">
        <Providers>

          <InternetStatus >
            <Sidebar>
              {children}
            </Sidebar>
          </InternetStatus>

          <Toaster />
          <BorderLoder />
          <Following />
          <Loder />
          <ProfileShow />
          <Remover />
          <PostSec/>
          <SingBorderLoder/>
        </Providers>
      </body>
    </html>
  );
}
