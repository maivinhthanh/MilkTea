const sql = require('mssql')
const config = require('../connect')

exports.Select_All_Product = function(req, res, next){
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`DECLARE @RC int 
      EXECUTE @RC = [dbo].[Select_All_Product] 
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      res.status(200).send({ message: "${err}"})
      sql.close();
    });
    
}
exports.Select_All_Meterial = function(req, res, next){
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`DECLARE @RC int 
      EXECUTE @RC = [dbo].[Select_All_Meterial] 
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      res.status(200).send({ message: "${err}"})
      sql.close();
    });
    
}
exports.Insert_Meterial = function(req, res, next){
  console.log(`DECLARE @RC int
    DECLARE @_Name nvarchar(50)
    DECLARE @_Price int
    DECLARE @_Count int    
    EXECUTE @RC = [dbo].[Insert_Material] 
       @_Name = '${req.body._Name}'
      ,@_Price = ${req.body._Price}
      ,@_Count = ${req.body._Count}
    `)
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`DECLARE @RC int
    DECLARE @_Name nvarchar(50)
    DECLARE @_Price int
    DECLARE @_Count int    
    EXECUTE @RC = [dbo].[Insert_Material] 
       @_Name = '${req.body._Name}'
      ,@_Price = ${req.body._Price}
      ,@_Count = ${req.body._Count}
    `)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send({code: 'ok', value: 
      {
        _Name : req.body._Name, 
        _Price : req.body._Price,
        _Count : req.body._Count
      }
    });
    sql.close();
  }).catch(err => {
    res.status(200).send({ message: err})
    sql.close();
  });
  
}