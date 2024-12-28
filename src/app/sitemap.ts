import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/core/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${getBaseUrl()}/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
