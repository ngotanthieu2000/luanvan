

var jsrecommender = require("js-recommender");

var recommender = new jsrecommender.Recommender();
      
var table = new jsrecommender.Table();
//model
const Behaviours = require('../models/BehavioursModel ')

  // table.setCell('[movie-name]', '[user]', [score]);
table.setCell('Love at last', 'Alice', 5);
table.setCell('Remance forever', 'Alice', 5);
table.setCell('Nonstop car chases', 'Alice', 0);
table.setCell('Sword vs. karate', 'Alice', 0);
table.setCell('Love at last', 'Bob', 5);
table.setCell('Cute puppies of love', 'Bob', 4);
table.setCell('Nonstop car chases', 'Bob', 0);
table.setCell('Sword vs. karate', 'Bob', 0);
table.setCell('Love at last', 'Carol', 0);
table.setCell('Cute puppies of love', 'Carol', 0);
table.setCell('Nonstop car chases', 'Carol', 5);
table.setCell('Sword vs. karate', 'Carol', 5);
table.setCell('Love at last', 'Dave', 0);
table.setCell('Remance forever', 'Dave', 0);
table.setCell('Nonstop car chases', 'Dave', 4);

var model = recommender.fit(table);
// console.log(model);
predicted_table = recommender.transform(table);

// console.log("predicted_table:::",predicted_table);

function showTableData(){
    for (var i = 0; i < predicted_table.columnNames.length; ++i) {
        var user = predicted_table.columnNames[i];
        console.log('For user: ' + user);
        for (var j = 0; j < predicted_table.rowNames.length; ++j) {
            var movie = predicted_table.rowNames[j];
            console.log('Movie [' + movie + '] has actual rating of ' + Math.round(table.getCell(movie, user)));
            console.log('Movie [' + movie + '] is predicted to have rating ' + Math.round(predicted_table.getCell(movie, user)));
        }
    }
}

function getValueColumn(columnName){
    const length_row = predicted_table.rowNames.length
    console.log("Num row name:::",length_row)
    for(let i = 0 ;i<length_row;i++){
        console.log("Rownamw:::",predicted_table.rowNames[i])
        console.log("Value:::", Math.round(predicted_table.getCell(predicted_table.rowNames[i],columnName)))
    }
    // var key = predicted_table.cellKey('Love at last','Alice');
    // console.log("Cell key[Love at last][Alice]:::",key)
    // console.log("Value in key[Love at last][Alice]:::",predicted_table.cells[key])
}
module.exports = {
    setDataTable: async (req,res,next)=>{
        try {
            const data = await Behaviours.find()
            if(!data[0]) return res.status(400).json({code:"Error", msg:"Data empty"})

            for(let i = 0 ;i<data.length; i++){
                data[i]?.ratings.map((element)=>{
                    table.setCell(element.item, data[i]?.userId, element.value);
                })
            }
            let model = recommender.fit(table);
            predicted_table = recommender.transform(table);

            req.body.predicted_table = predicted_table
            next()

        } catch (error) {
            console.log(error)
        }
    },
    showTableData ,
    getValueColumn
}