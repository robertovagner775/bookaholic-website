function getValueParam() {
        const params = new URLSearchParams(window.location.search);
        const path = params.get("path")
        return path;
}
        /*

        const epub =  ePub("./../" +getValueParam(), {});

  
        const zip = new JSZip();

        const {files} = epub.zip.zip;

        Object.keys(files).forEach(file => {
            console.log(file)
        });
        var book = epub
        var rendition = book.renderTo("area", {method: "default" ,width: 600, height: 400});
        var displayed = rendition.display();

       */


var exControls = TreineticEpubReader.handler();
exControls.registerEvent("onEpubLoadSuccess", function () {
           
});

exControls.registerEvent("onEpubLoadFail", function () {

});

exControls.registerEvent("onTOCLoaded", function (hasTOC) {
            if (!hasTOC) {
                let toc =  exControls.getTOCJson();
            }
               
               
                exControls.hasNextPage()
                exControls.nextPage();
                exControls.hasPrevPage()
                exControls.prevPage();
                exControls.makeBookMark();
                exControls.changeFontSize();
                exControls.changeColumnMaxWidth();
                exControls.setTheme("theme-id-goes-here");
                exControls.setScrollMode("scroll-type-id-goes-here");
                exControls.setDisplayFormat("display-format-id-goes-here");

                extcontrols.getRecommendedFontSizeRange()
                extcontrols.getRecommendedColumnWidthRange()
                var list = extcontrols.getAvailableThemes();
                var list = extcontrols.getAvailableScrollModes();
                var list = extcontrols.getAvailableDisplayFormats();
                var settings = extcontrols.getCurrentReaderSettings();
                
                
            });


            // You can feed epub file as well as extracted path of the epub 
            // if you are planning to use epub file directly make sure that worker js files inside `ZIPJS` the `dist` is copied outside to a accessible location.
            // and set the root folder path of those files to 'jsLibRoot'  
            const params = new URLSearchParams(window.location.search);
            const path = params.get("path")

            console.log(path)

            var config = TreineticEpubReader.config();
            config.jsLibRoot = "./../workers/"

            TreineticEpubReader.create("#epub-reader-frame");

           
            TreineticEpubReader.open("./../node_modules/@treinetic/treinetic-epub-reader/dist/sample/assets/epub/epub_1.epub");