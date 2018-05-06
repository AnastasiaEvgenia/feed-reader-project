/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM  elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* FIRST TEST SUITE ------------------------------------------------------------
     * This suite is all about the RSS feeds definitions and the 
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        /* This tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined,', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('have none empty and defined urls,', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        /* A test that loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('have none empty and defined names.', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });

    });


    /* SECOND TEST SUITE ------------------------------------------------------------
     * This suite is about the navigation menu of the application.
     */
    describe('The menu', function() {

        /* This test ensures that the menu element is hidden by default.
         */
        it('is hidden by default,', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes visibility when the menu
         * icon is clicked.
         */
        it('changes visibility when menu icon is clicked.', function() {

            /* jQuery provides a way to trigger a click event on an element
             * using the click() method.
             */

            /* Trigger a first click on menu icon to check if menu opens.
             */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            /* Trigger a second click on menu icon to check if menu closes.
             */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    /* THIRD TEST SUITE ------------------------------------------------------------
       This suite is about the first feed entries.
     */
    describe('Initial Entries', function() {

        /* Notify Jasmine framework that loadFeed() is an asynchronous function. 
         * Test must run after the completion of the loadFeed() function. We achieve
         * this result by using the begoreEach() and done() functions of Jasmine library.
         */
        beforeEach(function (done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* This test ensures that when the loadFeed() function is called and
         * completes its work, there is at least single entry element within the
         * feed container.
         */
         it('exist in feed container after loadFeed() runs.', function(done) {
            const feedEntry = $('.feed .entry-link');
            expect(feedEntry.length).not.toBe(0);
            done();
         });

    });


    /* FORTH TEST SUITE ------------------------------------------------------------
     * Test suite about the new feed selection.
     */
    describe('New Feed Selection', function() {

        /* Create two variables that will contain the different feeds
         * the loadFeed() function is fetching respectively.            
         */
        let firstFeed ='';
        let secondFeed = '';

        /* Again because loadFeed() is asynchronous use beforeEach() and done() functions
         * to run tests only after loadFeed() has finished its work. We run loadFeed() two
         * times now with different index.
         */
        beforeEach(function (done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done(); 
               });
            });
        });

        /* A test that ensures when a new feed is loaded by the loadFeed()
         * function, that the content actually changes.
         */
        it('loads and feed content actually changes.', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });

    });

            
}());
