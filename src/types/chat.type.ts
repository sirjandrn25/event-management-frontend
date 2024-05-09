import { z } from "zod";

export const ChatSchema = z.object({
  title: z.string().optional(),
  is_group: z.string().optional(),
  user_ids: z.array(z.string()),
});
