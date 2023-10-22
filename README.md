# hosted link : https://mansi2020.github.io/js_weekly_test_5/  

![Screenshot (22)](https://github.com/mansi2020/js_weekly_test_5/assets/57188328/594d0e58-cf28-4cae-b843-334a3db8dfea)

The code begins by selecting various HTML elements using document.querySelector and document.querySelectorAll.

It sets up a defaultPhoneSlug object that maps default phone indexes to their corresponding slugs.

It adds click event listeners to default phone detail buttons to display details based on the predefined slugs.

When the search button is clicked, it retrieves the search text, and based on whether the search bar is empty or not, it either displays a message or proceeds to search and display phones that match the query.

The addPhones function fetches data from an API based on the search query, processes the data, and displays it as phone cards in the DOM.

Clicking the "Show All" button fetches more phone data and adds additional phone cards to the display using the addAllPhones function.

The showDetail function is used to display a pop-up with detailed information about a selected phone based on its slug. It fetches data for the selected phone, creates a pop-up, and appends it to the document. Users can close the pop-up by clicking the "CLOSE" button.

The code includes event listeners for detail buttons on the dynamically added cards.
