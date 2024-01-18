"use client";

import cn from "classnames";
import { useEffect, useState } from "react";
// Components
import InboxItemModal from "@/components/Inbox/InboxItemModal";
import InboxItems from "@/components/Inbox/InboxItems";
import { Button, ConfigProvider, Select, Tabs } from "antd";
import {
  AiOutlineComment,
  AiOutlineInbox,
  AiOutlineMessage,
  AiOutlineNotification,
  AiOutlineSync,
} from "react-icons/ai";
import { GoMention } from "react-icons/go";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
// APIs
import {
  archiveItems as archiveItemsApi,
  fetchInbox as fetchInboxApi,
} from "@/apis/inbox";
// Types
import { InboxItem, PaginationDetails } from "@/types/inbox";
// constants
import { integrationCategories } from "@/constants/integrations";

const tabItems = [
  {
    key: "message",
    label: "Messages",
    Icon: AiOutlineMessage,
  },
  {
    key: "comment",
    label: "Comments",
    Icon: AiOutlineComment,
  },
  {
    key: "notification",
    label: "Notifications",
    Icon: AiOutlineNotification,
  },
];

export default function Gmail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItemIds, setSelectedItemIds] = useState<React.Key[]>([]);
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([] as InboxItem[]);
  const [inboxPagination, setInboxPagination] = useState<PaginationDetails>(
    {} as PaginationDetails
  );
  const [activeTab, setActiveTab] = useState<string>("message");
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    category: "message",
  });
  const [search, setSearch] = useState<Record<string, string>>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [isInboxItemModalVisible, setIsInboxItemModalVisible] =
    useState<boolean>(false);
  const [filterByIAmMentionedButtonText, setFilterByIAmMentionedButtonText] =
    useState<string>("For Me");

  const refetchInboxItems = async () => {
    try {
      setLoading(true);
      const response = await fetchInboxApi({ filters, search, page });
      setInboxItems(JSON.parse(response.results).items);
      setInboxPagination(JSON.parse(response.results).details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const archiveItems = (itemIds: React.Key[]) => {
    try {
      archiveItemsApi({
        item_ids: itemIds,
      });
      setInboxItems((prevState) => {
        return prevState.filter((item) => {
          return !itemIds.includes(parseInt(item.id));
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchInboxItems = async () => {
      try {
        setLoading(true);
        const response = await fetchInboxApi({
          filters,
          search,
          pagination: { page },
        });
        setInboxItems(JSON.parse(response.results).items);
        setInboxPagination(JSON.parse(response.results).details);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInboxItems();
  }, [page, filters, search, activeTab]);

  return (
    <main className="order-2 h-screen flex-[1_0_16rem] overflow-y-scroll bg-servcy-gray p-3">
      <header className="mb-6 h-[80px] rounded-lg bg-servcy-white p-6">
        <div className="flex">
          <AiOutlineInbox className="my-auto mr-2" size="24" />
          <p className="text-xl">Inbox</p>
          <Button
            onClick={refetchInboxItems}
            className="ml-auto h-full p-0 hover:!border-servcy-green hover:!text-servcy-green"
          >
            <AiOutlineSync
              className={cn("my-auto", {
                "animate-spin": loading,
              })}
              size="24"
            />
          </Button>
        </div>
      </header>
      <div className="mb-6 min-h-[80px] rounded-lg bg-servcy-white p-6 text-lg">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: "#032123",
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey="message"
            indicatorSize={(origin) => origin - 16}
            onChange={(key) => {
              setFilters((prevState) => {
                return { ...prevState, category: key };
              });
              setActiveTab(key);
              if (key === "comment") {
                setFilterByIAmMentionedButtonText("Mentions Me");
              } else {
                setFilterByIAmMentionedButtonText("For Me");
              }
            }}
            tabBarExtraContent={
              <div className="flex">
                <Button
                  className={cn(
                    "mr-2 text-sm hover:!border-servcy hover:!text-servcy",
                    {
                      "!border-servcy !text-servcy": filters["i_am_mentioned"],
                    }
                  )}
                  onClick={() => {
                    setFilters((prevState) => {
                      return {
                        ...prevState,
                        i_am_mentioned: !prevState["i_am_mentioned"],
                      };
                    });
                  }}
                  icon={<GoMention />}
                >
                  <span>{filterByIAmMentionedButtonText}</span>
                </Button>
                <Button
                  className="mr-2 text-sm hover:!border-red-400 hover:!text-red-400"
                  disabled={inboxItems.length === 0}
                  onClick={() =>
                    archiveItems(inboxItems.map((item) => parseInt(item.id)))
                  }
                  icon={<HiArchiveBoxArrowDown />}
                >
                  <span>Read All ({inboxItems.length})</span>
                </Button>
                <Button
                  className="mr-2 text-sm hover:!border-red-400 hover:!text-red-400"
                  disabled={selectedItemIds.length === 0}
                  onClick={() =>
                    archiveItems(
                      selectedItemIds.map((item_id) =>
                        parseInt(item_id.toString())
                      )
                    )
                  }
                  icon={<HiArchiveBoxArrowDown />}
                >
                  <span>Read Selected</span>
                </Button>
                <Select
                  placeholder="Filter By Source"
                  allowClear
                  onClear={() => {
                    setFilters((prevState) => {
                      return { ...prevState, source: "" };
                    });
                  }}
                  value={filters["source"]}
                  onChange={(value) => {
                    setFilters((prevState) => {
                      return { ...prevState, source: value };
                    });
                  }}
                  options={Object.keys(integrationCategories).map(
                    (key: string) => {
                      return {
                        label: key,
                        value: key,
                      };
                    }
                  )}
                />
              </div>
            }
            items={tabItems.map((item) => {
              return {
                label: (
                  <div
                    className={cn(
                      "flex justify-center align-middle hover:!text-servcy-dark",
                      {
                        "text-servcy-green font-semibold":
                          activeTab === item.key,
                      }
                    )}
                  >
                    <item.Icon className="my-auto mr-2" />
                    {item.label}
                  </div>
                ),
                key: item.key,
                children: (
                  <InboxItems
                    setPage={setPage}
                    loading={loading}
                    page={page}
                    setFilters={setFilters}
                    inboxPagination={inboxPagination}
                    setSearch={setSearch}
                    setSelectedRowIndex={setSelectedRowIndex}
                    setIsInboxItemModalVisible={setIsInboxItemModalVisible}
                    archiveItems={archiveItems}
                    inboxItems={inboxItems}
                    activeTab={activeTab}
                    setSelectedItemIds={setSelectedItemIds}
                  />
                ),
              };
            })}
          />
        </ConfigProvider>
      </div>
      {isInboxItemModalVisible && (
        <InboxItemModal
          selectedRow={inboxItems[selectedRowIndex] ?? ({} as InboxItem)}
          setIsInboxItemModalVisible={setIsInboxItemModalVisible}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          totalInboxItems={inboxItems.length}
          activeTab={activeTab}
        />
      )}
    </main>
  );
}
