﻿var dataTable;
$(document).ready(function () {
    loadList();
});
function loadList() {
    dataTable = $('#DT_Campus').DataTable({
        "ajax": {
            "url": "/api/campusList",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            //should not be capital
            { "data": "campusName", "width": "70%" },
            {
                "data": "id", "render": function (data) {
                    return `<div class="text-center">
                    <a href="/Admin/Campuses/Upsert?id=${data}" type="button" class="btn btn-outline-primary mt-1 rounded" style="cursor:pointer; width: 100px;">
                        <i class="bi bi-pencil-square"></i> Edit </a>
                    <a href="/Admin/Campuses/Delete?id=${data}" class="btn btn-outline-danger mt-1 rounded" style="cursor:pointer; style="cursor: pointer; width: 100px; ">
                        <i class="bi bi-trash" ></i> Delete </a>
                    </div>`;
                }, "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "No data found."
        },
        "width": "100%"
    });
}
