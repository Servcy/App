import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { useProject, useUser } from "@hooks/store";

import { AppLayout } from "@layouts/app-layout";
import { ProjectSettingLayout } from "@layouts/settings-layout";
import toast from "react-hot-toast";

import { AutoArchiveAutomation, AutoCloseAutomation } from "@components/automation";
import { PageHead } from "@components/core";
import { ProjectSettingHeader } from "@components/headers";

import { NextPageWithLayout } from "@/types/types";
import { IProject } from "@servcy/types";

import { EUserProjectRoles } from "@constants/project";

const AutomationSettingsPage: NextPageWithLayout = observer(() => {
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  // store hooks
  const {
    membership: { currentProjectRole },
  } = useUser();
  const { currentProjectDetails: projectDetails, updateProject } = useProject();

  const handleChange = async (formData: Partial<IProject>) => {
    if (!workspaceSlug || !projectId || !projectDetails) return;

    await updateProject(workspaceSlug.toString(), projectId.toString(), formData).catch(() => {
      toast.error({
        type: "error",
        title: "Error!",
        message: "Something went wrong. Please try again.",
      });
    });
  };

  // derived values
  const isAdmin = currentProjectRole === EUserProjectRoles.ADMIN;
  const pageTitle = projectDetails?.name ? `${projectDetails?.name} - Automations` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <section className={`w-full overflow-y-auto py-8 pr-9 ${isAdmin ? "" : "opacity-60"}`}>
        <div className="flex items-center border-b border-custom-border-100 py-3.5">
          <h3 className="text-xl font-medium">Automations</h3>
        </div>
        <AutoArchiveAutomation handleChange={handleChange} />
        <AutoCloseAutomation handleChange={handleChange} />
      </section>
    </>
  );
});

AutomationSettingsPage.getWrapper = function getWrapper(page: ReactElement) {
  return (
    <AppLayout header={<ProjectSettingHeader title="Automations Settings" />} withProjectWrapper>
      <ProjectSettingLayout>{page}</ProjectSettingLayout>
    </AppLayout>
  );
};

export default AutomationSettingsPage;
