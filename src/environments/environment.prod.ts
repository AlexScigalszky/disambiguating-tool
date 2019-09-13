export const environment = {
  production: true,
  PATH_CATEGORIES_FILE: "./../assets/data/categories.json",
  PATH_ITEMS_FILE: "./../assets/data/items.json",
  PATH_USER_ITEMS_FILE: "./../assets/data/user_items.json",
  WORD_END_OF_ITEMS: "sfBnze3u6e9rzDp8ArGAEbpKUyWAfk",
  COLLECTION_ANSWERS: "answers",
  USER_ADMIN: "ZS3ntUQ2bzB9qEWvsNFParL9qS9C9PXg8",
  DATATABLE_OPTIONS: {
    // pagingType: 'full_numbers',
    lengthMenu: [50, 75, 100, "all"],
    pageLength: 50,
    dom: "Bfrtip",
    buttons: [
      { extend: 'copy', className: 'btn btn-primary' },
      { extend: 'print', className: 'btn btn-primary' },
      { extend: 'csv', className: 'btn btn-primary' },
      { extend: 'excel', className: 'btn btn-primary' },
      { extend: 'pdf', className: 'btn btn-primary' },
    ]
  }
};
