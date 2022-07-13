using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching;
using System.Data.SqlClient;
using System.Data;
using WebApi.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IConfiguration _configuration = null!;
        private readonly IWebHostEnvironment _env = null!;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //Get with raw query is aparently not preferred so see what you can do about it
            string query = @"select EmployeeId, EmployeeName, Department, 
                    convert(varchar(10),DateOfJoining,120) as DateOfJoining,
                    PhotoFileName 
            from dbo.Employee";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader = null!;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            //Get with raw query is aparently not preferred so see what you can do about it
            string query = @"insert into dbo.Employee
            (EmployeeName,Department,DateOfJoining,PhotoFileName)
            values
            (
                '" + emp.EmployeeName + @"'
                ,'" + emp.Department + @"'
                ,'" + emp.DateOfJoining + @"'
                ,'" + emp.PhotoFileName + @"'
            )";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader = null!;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            //Get with raw query is aparently not preferred so see what you can do about it
            string query = @"update dbo.Employee set
                EmployeeName = '" + emp.EmployeeName + @"'
                ,Department = '" + emp.Department + @"'
                ,DateOfJoining = '" + emp.DateOfJoining + @"'
                ,PhotoFileName = '" + emp.PhotoFileName + @"'
            where EmployeeId = '" + emp.EmployeeId+@"'";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader = null!;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            //Get with raw query is aparently not preferred so see what you can do about it
            string query = @"delete from dbo.Employee
                 where EmployeeId = '" + id + @"'
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader = null!;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            var httprequest = Request.Form;//aparently only png images work
            var postedFile = httprequest.Files[0];
            string filename = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Photos/"+ filename;

            try
            {
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonimous.png");
            }
        }
        [Route("GetAllDepartmentNames")]
        [HttpGet]
        public JsonResult GetAllDepartmentNames()
        {
            //Get with raw query is aparently not preferred so see what you can do about it
            string query = @"select DepartmentName from dbo.Department";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader = null!;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
