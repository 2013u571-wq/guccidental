export const deskStructure = (S: any) =>
  S.list()
    .title("Guccidental content")
    .items([
      S.listItem()
        .title("Products")
        .child(S.documentTypeList("product").title("Products")),
      S.listItem()
        .title("Product content")
        .child(S.documentTypeList("productTranslation").title("Product content by language")),
      S.listItem()
        .title("Product categories")
        .child(S.documentTypeList("productCategory").title("Product categories")),
      S.divider(),
      S.listItem()
        .title("Downloads & resources")
        .child(
          S.list()
            .title("Downloads & resources")
            .items([
              S.documentTypeListItem("download").title("Downloads"),
              S.documentTypeListItem("resource").title("Resources")
            ])
        ),
      S.listItem()
        .title("Customer cases")
        .child(S.documentTypeList("caseStudy").title("Customer cases")),
      S.listItem()
        .title("News")
        .child(S.documentTypeList("post").title("News")),
      S.divider(),
      S.documentTypeListItem("navigation").title("Navigation"),
      S.documentTypeListItem("siteSettings").title("Site settings")
    ]);
