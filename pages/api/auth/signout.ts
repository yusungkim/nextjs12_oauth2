import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@lib/server/withMethodGuard";
import { withApiSession } from "@lib/server/withSession";
import { ApiResponse } from "@lib/server/api";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  req.session.destroy();
  return res.status(200).json({ ok: true });
}

// get and post, both ok.
export default withApiSession(withMethodGuard({ methods: ["GET", "POST"], handler }));
