import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

import { useProject, useUser } from "@hooks/store";

import { AppLayout } from "@layouts/app-layout";
import { ProjectSettingLayout } from "@layouts/settings-layout";

import { PageHead } from "@components/core";
import { ProjectSettingHeader } from "@components/headers";
import { ProjectFeaturesList } from "@components/project";

import { NextPageWithLayout } from "@/types/types";

const FeaturesSettingsPage: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;
  // store
  const {
    membership: { fetchUserProjectInfo },
  } = useUser();
  const { currentProjectDetails } = useProject();
  // fetch the project details
  const { data: memberDetails } = useSWR(
    workspaceSlug && projectId ? `PROJECT_MEMBERS_ME_${workspaceSlug}_${projectId}` : null,
    workspaceSlug && projectId ? () => fetchUserProjectInfo(workspaceSlug.toString(), projectId.toString()) : null
  );
  // derived values
  const isAdmin = memberDetails?.role === 20;
  const pageTitle = currentProjectDetails?.name ? `${currentProjectDetails?.name} - Features` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <section className={`w-full overflow-y-auto py-8 pr-9 ${isAdmin ? "" : "opacity-60"}`}>
        <div className="flex items-center border-b border-custom-border-100 py-3.5">
          <h3 className="text-xl font-medium">Features</h3>
        </div>
        <ProjectFeaturesList />
      </section>
    </>
  );
});

FeaturesSettingsPage.getWrapper = function getWrapper(page: ReactElement) {
  return (
    <AppLayout header={<ProjectSettingHeader title="Features Settings" />} withProjectWrapper>
      <ProjectSettingLayout>{page}</ProjectSettingLayout>
    </AppLayout>
  );
};

export default FeaturesSettingsPage;
