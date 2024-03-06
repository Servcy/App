
import { WebhookSecretKey } from "./form";

import { Button } from "@servcy/ui";

import { IWebhook } from "@servcy/types";

type Props = {
  handleClose: () => void;
  webhookDetails: IWebhook;
};

export const GeneratedHookDetails: React.FC<Props> = (props) => {
  const { handleClose, webhookDetails } = props;

  return (
    <div>
      <div className="space-y-3 mb-3">
        <h3 className="text-lg font-medium leading-6 text-custom-text-100">Key created</h3>
        <p className="text-sm text-custom-text-400">
          Copy and save this secret key in Servcy Pages. You can{"'"}t see this key after you hit Close. A CSV file
          containing the key has been downloaded.
        </p>
      </div>
      <WebhookSecretKey data={webhookDetails} />
      <div className="mt-6 flex justify-end">
        <Button variant="neutral-primary" size="sm" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
};