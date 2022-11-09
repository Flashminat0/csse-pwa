import httpProxyMiddleware from 'next-http-proxy-middleware'
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
	httpProxyMiddleware(req, res, {
		target: `http://localhost:8000/api/`,
		pathRewrite: [
			{
				patternStr: '^/api',
				replaceStr: '',
			},
		],
	})
