import { onRequestDelete as __api_admin_orders__id__js_onRequestDelete } from "/home/claude/otr/functions/api/admin/orders/[id].js"
import { onRequestGet as __api_admin_orders__id__js_onRequestGet } from "/home/claude/otr/functions/api/admin/orders/[id].js"
import { onRequestPut as __api_admin_orders__id__js_onRequestPut } from "/home/claude/otr/functions/api/admin/orders/[id].js"
import { onRequestPut as __api_admin_pages__slug__js_onRequestPut } from "/home/claude/otr/functions/api/admin/pages/[slug].js"
import { onRequestDelete as __api_admin_posts__slug__js_onRequestDelete } from "/home/claude/otr/functions/api/admin/posts/[slug].js"
import { onRequestPut as __api_admin_posts__slug__js_onRequestPut } from "/home/claude/otr/functions/api/admin/posts/[slug].js"
import { onRequestDelete as __api_admin_products__id__js_onRequestDelete } from "/home/claude/otr/functions/api/admin/products/[id].js"
import { onRequestPut as __api_admin_products__id__js_onRequestPut } from "/home/claude/otr/functions/api/admin/products/[id].js"
import { onRequestDelete as __api_admin_clp_js_onRequestDelete } from "/home/claude/otr/functions/api/admin/clp.js"
import { onRequestGet as __api_admin_clp_js_onRequestGet } from "/home/claude/otr/functions/api/admin/clp.js"
import { onRequestPost as __api_admin_clp_js_onRequestPost } from "/home/claude/otr/functions/api/admin/clp.js"
import { onRequestPut as __api_admin_clp_js_onRequestPut } from "/home/claude/otr/functions/api/admin/clp.js"
import { onRequestPost as __api_admin_images_js_onRequestPost } from "/home/claude/otr/functions/api/admin/images.js"
import { onRequestGet as __api_admin_me_js_onRequestGet } from "/home/claude/otr/functions/api/admin/me.js"
import { onRequestGet as __api_admin_orders_index_js_onRequestGet } from "/home/claude/otr/functions/api/admin/orders/index.js"
import { onRequestGet as __api_admin_pages_index_js_onRequestGet } from "/home/claude/otr/functions/api/admin/pages/index.js"
import { onRequestGet as __api_admin_posts_index_js_onRequestGet } from "/home/claude/otr/functions/api/admin/posts/index.js"
import { onRequestPost as __api_admin_posts_index_js_onRequestPost } from "/home/claude/otr/functions/api/admin/posts/index.js"
import { onRequestGet as __api_admin_products_index_js_onRequestGet } from "/home/claude/otr/functions/api/admin/products/index.js"
import { onRequestPost as __api_admin_products_index_js_onRequestPost } from "/home/claude/otr/functions/api/admin/products/index.js"
import { onRequestDelete as __api_admin_sample_js_onRequestDelete } from "/home/claude/otr/functions/api/admin/sample.js"
import { onRequestGet as __api_admin_settings_js_onRequestGet } from "/home/claude/otr/functions/api/admin/settings.js"
import { onRequestPut as __api_admin_settings_js_onRequestPut } from "/home/claude/otr/functions/api/admin/settings.js"
import { onRequestGet as __api_page__slug__js_onRequestGet } from "/home/claude/otr/functions/api/page/[slug].js"
import { onRequestGet as __api_posts__slug__js_onRequestGet } from "/home/claude/otr/functions/api/posts/[slug].js"
import { onRequestGet as __api_products__id__js_onRequestGet } from "/home/claude/otr/functions/api/products/[id].js"
import { onRequestPost as __api_checkout_js_onRequestPost } from "/home/claude/otr/functions/api/checkout.js"
import { onRequestGet as __api_config_js_onRequestGet } from "/home/claude/otr/functions/api/config.js"
import { onRequestGet as __api_contact_js_onRequestGet } from "/home/claude/otr/functions/api/contact.js"
import { onRequestPost as __api_contact_js_onRequestPost } from "/home/claude/otr/functions/api/contact.js"
import { onRequestGet as __api_order_status_js_onRequestGet } from "/home/claude/otr/functions/api/order-status.js"
import { onRequestGet as __api_posts_index_js_onRequestGet } from "/home/claude/otr/functions/api/posts/index.js"
import { onRequestGet as __api_products_index_js_onRequestGet } from "/home/claude/otr/functions/api/products/index.js"
import { onRequestPost as __api_quote_js_onRequestPost } from "/home/claude/otr/functions/api/quote.js"
import { onRequestPost as __api_stripe_webhook_js_onRequestPost } from "/home/claude/otr/functions/api/stripe-webhook.js"
import { onRequest as __api_admin__middleware_js_onRequest } from "/home/claude/otr/functions/api/admin/_middleware.js"
import { onRequestGet as __blog__slug__js_onRequestGet } from "/home/claude/otr/functions/blog/[slug].js"
import { onRequestGet as __img__id__js_onRequestGet } from "/home/claude/otr/functions/img/[id].js"
import { onRequestGet as __products__slug__js_onRequestGet } from "/home/claude/otr/functions/products/[slug].js"
import { onRequestGet as __blog_js_onRequestGet } from "/home/claude/otr/functions/blog.js"
import { onRequestGet as __blog_post_js_onRequestGet } from "/home/claude/otr/functions/blog-post.js"
import { onRequestGet as __contact_js_onRequestGet } from "/home/claude/otr/functions/contact.js"
import { onRequestGet as __delivery_returns_js_onRequestGet } from "/home/claude/otr/functions/delivery-returns.js"
import { onRequestGet as __faq_js_onRequestGet } from "/home/claude/otr/functions/faq.js"
import { onRequestGet as __llms_txt_js_onRequestGet } from "/home/claude/otr/functions/llms.txt.js"
import { onRequestGet as __privacy_js_onRequestGet } from "/home/claude/otr/functions/privacy.js"
import { onRequestGet as __product_js_onRequestGet } from "/home/claude/otr/functions/product.js"
import { onRequestGet as __seasonal_js_onRequestGet } from "/home/claude/otr/functions/seasonal.js"
import { onRequestGet as __shop_js_onRequestGet } from "/home/claude/otr/functions/shop.js"
import { onRequestGet as __sitemap_xml_js_onRequestGet } from "/home/claude/otr/functions/sitemap.xml.js"
import { onRequestGet as __terms_js_onRequestGet } from "/home/claude/otr/functions/terms.js"
import { onRequestGet as __index_js_onRequestGet } from "/home/claude/otr/functions/index.js"

export const routes = [
    {
      routePath: "/api/admin/orders/:id",
      mountPath: "/api/admin/orders",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_orders__id__js_onRequestDelete],
    },
  {
      routePath: "/api/admin/orders/:id",
      mountPath: "/api/admin/orders",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_orders__id__js_onRequestGet],
    },
  {
      routePath: "/api/admin/orders/:id",
      mountPath: "/api/admin/orders",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_orders__id__js_onRequestPut],
    },
  {
      routePath: "/api/admin/pages/:slug",
      mountPath: "/api/admin/pages",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_pages__slug__js_onRequestPut],
    },
  {
      routePath: "/api/admin/posts/:slug",
      mountPath: "/api/admin/posts",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_posts__slug__js_onRequestDelete],
    },
  {
      routePath: "/api/admin/posts/:slug",
      mountPath: "/api/admin/posts",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_posts__slug__js_onRequestPut],
    },
  {
      routePath: "/api/admin/products/:id",
      mountPath: "/api/admin/products",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_products__id__js_onRequestDelete],
    },
  {
      routePath: "/api/admin/products/:id",
      mountPath: "/api/admin/products",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_products__id__js_onRequestPut],
    },
  {
      routePath: "/api/admin/clp",
      mountPath: "/api/admin",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_clp_js_onRequestDelete],
    },
  {
      routePath: "/api/admin/clp",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_clp_js_onRequestGet],
    },
  {
      routePath: "/api/admin/clp",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_clp_js_onRequestPost],
    },
  {
      routePath: "/api/admin/clp",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_clp_js_onRequestPut],
    },
  {
      routePath: "/api/admin/images",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_images_js_onRequestPost],
    },
  {
      routePath: "/api/admin/me",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_me_js_onRequestGet],
    },
  {
      routePath: "/api/admin/orders",
      mountPath: "/api/admin/orders",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_orders_index_js_onRequestGet],
    },
  {
      routePath: "/api/admin/pages",
      mountPath: "/api/admin/pages",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_pages_index_js_onRequestGet],
    },
  {
      routePath: "/api/admin/posts",
      mountPath: "/api/admin/posts",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_posts_index_js_onRequestGet],
    },
  {
      routePath: "/api/admin/posts",
      mountPath: "/api/admin/posts",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_posts_index_js_onRequestPost],
    },
  {
      routePath: "/api/admin/products",
      mountPath: "/api/admin/products",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_products_index_js_onRequestGet],
    },
  {
      routePath: "/api/admin/products",
      mountPath: "/api/admin/products",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_products_index_js_onRequestPost],
    },
  {
      routePath: "/api/admin/sample",
      mountPath: "/api/admin",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_sample_js_onRequestDelete],
    },
  {
      routePath: "/api/admin/settings",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_settings_js_onRequestGet],
    },
  {
      routePath: "/api/admin/settings",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_settings_js_onRequestPut],
    },
  {
      routePath: "/api/page/:slug",
      mountPath: "/api/page",
      method: "GET",
      middlewares: [],
      modules: [__api_page__slug__js_onRequestGet],
    },
  {
      routePath: "/api/posts/:slug",
      mountPath: "/api/posts",
      method: "GET",
      middlewares: [],
      modules: [__api_posts__slug__js_onRequestGet],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "GET",
      middlewares: [],
      modules: [__api_products__id__js_onRequestGet],
    },
  {
      routePath: "/api/checkout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_checkout_js_onRequestPost],
    },
  {
      routePath: "/api/config",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_config_js_onRequestGet],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_contact_js_onRequestGet],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api/order-status",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_order_status_js_onRequestGet],
    },
  {
      routePath: "/api/posts",
      mountPath: "/api/posts",
      method: "GET",
      middlewares: [],
      modules: [__api_posts_index_js_onRequestGet],
    },
  {
      routePath: "/api/products",
      mountPath: "/api/products",
      method: "GET",
      middlewares: [],
      modules: [__api_products_index_js_onRequestGet],
    },
  {
      routePath: "/api/quote",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_quote_js_onRequestPost],
    },
  {
      routePath: "/api/stripe-webhook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_webhook_js_onRequestPost],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api/admin",
      method: "",
      middlewares: [__api_admin__middleware_js_onRequest],
      modules: [],
    },
  {
      routePath: "/blog/:slug",
      mountPath: "/blog",
      method: "GET",
      middlewares: [],
      modules: [__blog__slug__js_onRequestGet],
    },
  {
      routePath: "/img/:id",
      mountPath: "/img",
      method: "GET",
      middlewares: [],
      modules: [__img__id__js_onRequestGet],
    },
  {
      routePath: "/products/:slug",
      mountPath: "/products",
      method: "GET",
      middlewares: [],
      modules: [__products__slug__js_onRequestGet],
    },
  {
      routePath: "/blog",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__blog_js_onRequestGet],
    },
  {
      routePath: "/blog-post",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__blog_post_js_onRequestGet],
    },
  {
      routePath: "/contact",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__contact_js_onRequestGet],
    },
  {
      routePath: "/delivery-returns",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__delivery_returns_js_onRequestGet],
    },
  {
      routePath: "/faq",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__faq_js_onRequestGet],
    },
  {
      routePath: "/llms.txt",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__llms_txt_js_onRequestGet],
    },
  {
      routePath: "/privacy",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__privacy_js_onRequestGet],
    },
  {
      routePath: "/product",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__product_js_onRequestGet],
    },
  {
      routePath: "/seasonal",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__seasonal_js_onRequestGet],
    },
  {
      routePath: "/shop",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__shop_js_onRequestGet],
    },
  {
      routePath: "/sitemap.xml",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__sitemap_xml_js_onRequestGet],
    },
  {
      routePath: "/terms",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__terms_js_onRequestGet],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__index_js_onRequestGet],
    },
  ]