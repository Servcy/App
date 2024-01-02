"use client";

import { useRouter } from "next/navigation";
// Components
import {
  AiFillApi,
  AiOutlineArrowRight,
  AiOutlineSetting,
} from "react-icons/ai";
import { TbHourglassEmpty } from "react-icons/tb";

export default function Settings(): JSX.Element {
  const router = useRouter();
  return (
    <main className="order-2 h-screen flex-[1_0_16rem] overflow-y-scroll bg-servcy-gray p-3">
      <header className="mb-6 h-[80px] rounded-lg bg-servcy-white p-6">
        <div className="flex flex-row">
          <AiOutlineSetting size="24" className="my-auto mr-2" />
          <p className="text-xl">Settings</p>
        </div>
      </header>
      <div className="flex gap-4">
        <div className="w-56 flex-none rounded-lg bg-servcy-white p-6">
          <div className="flex flex-col gap-4 font-semibold">
            <div className="servcy-small-title flex flex-row items-center gap-2 text-xs text-servcy-neutral">
              Quick Access Menu
            </div>
            <hr className="h-[1.5px] border-none bg-servcy-wheat" />
            <div className="flex flex-col gap-4 text-sm text-servcy-neutral">
              <button
                onClick={() => {
                  router.push("/settings/integrations");
                }}
                className="border-1 flex cursor-pointer flex-row rounded-lg border-servcy-black p-2 hover:border-none hover:bg-servcy-wheat hover:text-servcy-black"
              >
                <AiFillApi size="18" className="my-auto mr-2" />
                <p>Integrations</p>
                <AiOutlineArrowRight size="16" className="my-auto ml-auto" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto rounded-lg bg-servcy-white p-16">
          <div className="flex flex-col items-center justify-center">
            <TbHourglassEmpty className="h-32 w-32 text-servcy-black" />
            <p className="mt-2 font-semibold text-servcy-black">
              Please select something from the left menu.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}