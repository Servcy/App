import React, { useState, ReactElement } from "react";
import { observer } from "mobx-react";
// layouts
import { AppLayout } from "@layouts/app-layout";

import { PageHead } from "@components/core";
import { GlobalDefaultViewListItem, GlobalViewsList } from "@components/workspace";
import { GlobalIssuesHeader } from "@components/headers";

import { Input } from "@servcy/ui";
// icons
import { Search } from "lucide-react";

import { NextPageWithLayout } from "@lib/types";

import { DEFAULT_GLOBAL_VIEWS_LIST } from "@constants/workspace";

import { useWorkspace } from "@hooks/store";

const WorkspaceViewsPage: NextPageWithLayout = observer(() => {
  const [query, setQuery] = useState("");
  // store
  const { currentWorkspace } = useWorkspace();
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - All Views` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex h-11 w-full items-center gap-2.5  px-5 py-3 overflow-hidden border-b border-custom-border-200">
          <Search className="text-custom-text-200" size={14} strokeWidth={2} />
          <Input
            className="w-full bg-transparent !p-0 text-xs leading-5 text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            mode="true-transparent"
          />
        </div>
        <div className="flex flex-col h-full w-full vertical-scrollbar scrollbar-lg">
          {DEFAULT_GLOBAL_VIEWS_LIST.filter((v) => v.label.toLowerCase().includes(query.toLowerCase())).map(
            (option) => (
              <GlobalDefaultViewListItem key={option.key} view={option} />
            )
          )}
          <GlobalViewsList searchQuery={query} />
        </div>
      </div>
    </>
  );
});

WorkspaceViewsPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout header={<GlobalIssuesHeader activeLayout="list" />}>{page}</AppLayout>;
};

export default WorkspaceViewsPage;
