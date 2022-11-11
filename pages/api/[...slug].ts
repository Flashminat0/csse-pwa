import httpProxyMiddleware from 'next-http-proxy-middleware'
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
	httpProxyMiddleware(req, res, {
		target: `https://uee-backend-pwa.herokuapp.com/api/`,
		pathRewrite: [
			{
				patternStr: '^/api',
				replaceStr: '',
			},
		],
	})
