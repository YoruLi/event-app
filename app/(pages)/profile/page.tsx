import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export default function ProfilePage() {
  return (
    <div className="mx-auto  flex justify-center w-full  gap-2">
      <div className="bg-background text-background">
        <UserProfile
          appearance={{
            variables: { colorPrimary: "transparent", colorTextOnPrimaryBackground: "transparent" },
            elements: {
              profilePage: "!text-primary ",
              page: "[&>*>*]:text-primary",
              profilePage__account: "!bg-background",
              card: "bg-background shadow-none border-none",
              profileSectionTitleText: "!text-primary",
              profileSectionPrimaryButton: "text-primary",
              headerTitle: "!text-primary",
              headerSubtitle: "!text-primary",
              accordionTriggerButton: {
                color: "currentColor",
              },
              breadcrumbsItem: "text-primary",
              breadcrumbsItemDivider: "text-primary",
              formButtonPrimary: "text-primary bg-muted",
              formButtonReset: "text-white bg-red-600 hover:bg-red-800",
              profileSection__activeDevices: {
                display: "none",
              },
              profileSectionContent__username: "*:text-primary *:text-lg *:first-letter:uppercase",
              badge: {
                color: "currentcolor",
              },
              navbar: "bg-background border-l border-border",
              formFieldLabelRow: "*:text-muted-foreground",
              profileSectionContent__danger: " w-full [&>*>*]:!text-white *:m-0 *:p-0 ",
              navbarMobileMenuButton: "text-primary",
              userPreviewTextContainer: "text-primary",
              navbarButton: "!text-primary",
            },
          }}
        />
      </div>
    </div>
  );
}
