﻿var wishlistId;

$(document).ready(function () {
    loadSemesterInstances();

    $('#ddlSemesterInstance').change(function () {
        var selectedSemesterId = $(this).val();
        $("#selectedSemesterId").text(selectedSemesterId);
        $("#selectedSemesterInstance").val(selectedSemesterId);

        //reload page with new selectedSemesterId
        window.location.href = window.location.pathname + '?selectedSemesterId=' + selectedSemesterId;

        loadTemplateCourses();
        getWishlistId().then(function () {
            loadCourseWishlist();
        });
    });

    $("#ddlTemplateCourses").change(function () {
        var selectedCourseId = $(this).val(item.course.id);
        $("#selectedCourse").val(selectedCourseId);
    });
});

$(document).on('click', '#btnRemoveCourse', function () {
    var courseId = $(this).data('course-id');
    // Now you can use courseId in your function
});

function loadSemesterInstances() {
    $.ajax({
        url: "/api/semesterInstance",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var dropdown = $("#ddlSemesterInstance");
            dropdown.empty();
            $.each(data.data, function (index, item) {
                if (item.id == $("#selectedSemesterId").text()) {
                    dropdown.append($("<option />").val(item.id).text(item.semesterInstanceName).attr("selected", "selected"));
                }
                else {
                    dropdown.append($("<option />").val(item.id).text(item.semesterInstanceName));
                }
            });

            loadTemplateCourses();
            getWishlistId().then(function () {
                loadCourseWishlist();
            });
        },
        error: function (xhr, error, thrown) {
            alert('Ajax error:' + xhr.responseText);
        }
    });
}

function loadTemplateCourses() {
    var selectedSemesterId = $("#ddlSemesterInstance").val(); // get the selected semester ID

    $.ajax({
        url: "/api/template?id=" + selectedSemesterId, // pass the semester ID to the API
        type: "GET",
        dataType: "json",
        success: function (data) {
            var dropdown = $("#ddlTemplateCourses");
            dropdown.empty();
            dropdown.append($("<option />").val("").text("Add Courses")); // default option

            $.each(data.data, function (index, item) {
                if (item.quantity > 0) { // check if Template.quantity > 0
                    var courseInfo = item.course.academicProgram.programCode + ' ' +
                        item.course.courseNumber + ' ' +
                        item.course.courseTitle;
                    dropdown.append($("<option />").val(item.course.id).text(courseInfo));
                }
            });
        },
        error: function (xhr, error, thrown) {
            alert('Ajax error:' + xhr.responseText);
        }
    });
}

function loadCourseWishlist() {
    $.ajax({
        url: "/api/wishlistCourse",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var table = $("#T_WishlistCourses");

            // Clear the table
            table.empty();

            // Add the table header
            var header = $('<tr>').append(
                $('<th>').text('Rank'),
                $('<th>').text('Course'),
                $('<th>').text(' ')
            );
            table.append(header);

            // Add the table body
            var body = $('<tbody>');
            table.append(body);

            // Sort the data by rank in ascending order
            data.data.sort(function (a, b) {
                return a.preferenceRank - b.preferenceRank;
            });

            // Populate the table with the sorted data
            $.each(data.data, function (i, item) {
                if (item.wishlistId == wishlistId) {
                    var row = $('<tr>').append(
                        $('<td>').html('<div style="display: flex; flex-direction: row; align-items: center;">' +
                            '<div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; margin-right: 5px;">' +
                            '<button class="btn rounded upRank-btn" data-wishlistCourseId="' + item.id + '"><i class="bi bi-caret-up-fill"></i></button>' +
                            '<div>' + item.preferenceRank + '</div>' +
                            '<button class="btn rounded downRank-btn" data-wishlistCourseId="' + item.id + '"><i class="bi bi-caret-down-fill"></i></button>' +
                            '</div>'),
                        $('<td>').text(item.course.academicProgram.programCode + " " + item.course.courseNumber + " " + item.course.courseTitle).css('vertical-align', 'middle'),
                        $('<td>').html('<button class="btn btn-outline-danger rounded archive-btn" data-wishlistCourseId="' + item.id + '"><i class="bi bi-trash-fill"></i></button>').css('vertical-align', 'middle'),
                    );
                    body.append(row);  // Append the row to the tbody, not the table

                    // Add event listener to the buttons
                    row.find('.archive-btn').on('click', function () {
                        var wishlistCourseId = $(this).attr('data-wishlistCourseId');
                        console.log("Wishlist Course Id = " + wishlistCourseId);

                        // Add post request here
                        $.ajax({
                            url: '/Instr/Wishlists?handler=ArchiveCourse',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                            },
                            type: 'POST',
                            data: { selectedCourse: wishlistCourseId },
                            success: function (data) {
                                // Handle success, if needed
                                console.log("Post request successful");
                                location.reload();
                            },
                            error: function (error) {
                                // Handle error, if needed
                                console.error("Error in post request", error);
                            }
                        });
                    });

                    row.find('.upRank-btn').on('click', function () {
                        var wishlistCourseId = $(this).attr('data-wishlistCourseId');
                        console.log("Wishlist Course Id = " + wishlistCourseId);

                        // Add post request here
                        $.ajax({
                            url: '/Instr/Wishlists?handler=UpRank',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                            },
                            type: 'POST',
                            data: { selectedCourse: wishlistCourseId },
                            success: function (data) {
                                // Handle success, if needed
                                console.log("Post request successful");
                                location.reload();
                            },
                            error: function (error) {
                                // Handle error, if needed
                                console.error("Error in post request", error);
                            }
                        });
                    });

                    row.find('.downRank-btn').on('click', function () {
                        var wishlistCourseId = $(this).attr('data-wishlistCourseId');
                        console.log("Wishlist Course Id = " + wishlistCourseId);

                        // Add post request here
                        $.ajax({
                            url: '/Instr/Wishlists?handler=DownRank',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                            },
                            type: 'POST',
                            data: { selectedCourse: wishlistCourseId },
                            success: function (data) {
                                // Handle success, if needed
                                console.log("Post request successful");
                                location.reload();
                            },
                            error: function (error) {
                                // Handle error, if needed
                                console.error("Error in post request", error);
                            }
                        });
                    });
                }
            });
        },
        error: function (xhr, error, thrown) {
            alert('Ajax error:' + xhr.responseText);
        }
    });
}




function getWishlistId() {
    var selectedSemesterId = $("#ddlSemesterInstance").val();

    // Return the promise from the AJAX call
    return $.ajax({
        url: '/api/wishlist',
        type: 'GET',
        dataType: "json",
        success: function (data) {
            $.each(data.data, function (index, item) {
                if (item.userId == userId && item.semesterInstanceId == selectedSemesterId) {
                    console.log("Its working " + item.id);
                    wishlistId = item.id;
                }
            });
        },
        error: function (error) {
            console.log("Its not working");
            console.log(error);
        }
    });
}

function loadTemplate() {
    
}