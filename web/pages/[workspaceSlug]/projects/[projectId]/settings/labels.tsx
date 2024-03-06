import { observer } from "mobx-react";
import { ReactElement } from "react";

import { AppLayout } from "@layouts/app-layout";
import { ProjectSettingLayout } from "@layouts/settings-layout";

import { PageHead } from "@components/core";
import { ProjectSettingHeader } from "@components/headers";
import { ProjectSettingsLabelList } from "@components/labels";

import { NextPageWithLayout } from "@/types/types";

import { useProject } from "@hooks/store";

const LabelsSettingsPage: NextPageWithLayout = observer(() => {
  const { currentProjectDetails } = useProject();
  const pageTitle = currentProjectDetails?.name ? `${currentProjectDetails?.name} - Labels` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <div className="h-full w-full gap-10 overflow-y-auto py-8 pr-9">
        <ProjectSettingsLabelList />
      </div>
    </>
  );
});

LabelsSettingsPage.getWrapper = function getWrapper(page: ReactElement) {
  return (
    <AppLayout withProjectWrapper header={<ProjectSettingHeader title="Labels Settings" />}>
      <ProjectSettingLayout>{page}</ProjectSettingLayout>
    </AppLayout>
  );
};

export default LabelsSettingsPage;
