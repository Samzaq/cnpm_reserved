import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "cnpm",
  password: "sql123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/main");
  res.render("admin/main.ejs");
});

// Staff_LobbyReception
// Staff_MainScreen

// app.get("/main", async (req, res) => {
//   res.render("user/main.ejs");
// });

app.get("/main", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM nguoidung");

    res.render("admin/main.ejs", { table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/main", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM nguoidung");

    res.render("admin/main.ejs", { table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/chooseuseradmin", async (req, res) => {
  const tendangnhap = req.body.chitiet;
  console.log("ten nguoi dung", tendangnhap);
  try {
    const result = await db.query("SELECT * FROM nguoidung");
    const result_ = await db.query(
      "SELECT * FROM nguoidung WHERE TenDangNhap = $1",
      [username_]
    );
    res.render("admin/main.ejs", { table: result.rows, chitiet: result_.rows });
    console.log(result_.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post("/chooseuseradmin", async (req, res) => {
  const tendangnhap = req.body.chitiet;
  console.log("ten nguoi dung", tendangnhap);
  try {
    const result = await db.query("SELECT * FROM nguoidung");
    const result_ = await db.query(
      "SELECT * FROM nguoidung WHERE TenDangNhap = $1",
      [tendangnhap]
    );
    res.render("admin/main.ejs", { table: result.rows, chitiet: result_.rows });
    console.log(result_.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login/login.ejs");
});

// staff thay doi quy dinh

// app.get("/", (req, res) => {
//   res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
// });

app.post("/thaydoiquydinh", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs");
});

app.post("/loaisanh", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs");
});

app.post("/ca", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
});

app.post("/monan", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs");
});

app.post("/dichvu", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs");
});

app.post("/thamso", async (req, res) => {
  res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs");
});

app.post("/themloaisanh", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs");
});

app.post("/xoaloaisanh", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs");
});

app.post("/sualoaisanh", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs");
});

app.post("/themca", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs");
});

app.post("/xoaca", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs");
});

app.post("/suaca", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs");
});

app.post("/themmonan", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs");
});

app.post("/xoamonan", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs");
});

app.post("/suamonan", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs");
});

app.post("/themdichvu", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs");
});

app.post("/xoadichvu", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs");
});

app.post("/suadichvu", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs");
});

app.post("/themloaisanhngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs");
});

app.post("/xoaloaisanhngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs");
});

app.post("/sualoaisanhngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs");
});

app.post("/themcangay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
});

app.post("/xoacangay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
});

app.post("/suacangay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
});

app.post("/themmonanngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs");
});

app.post("/xoamonanngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs");
});

app.post("/suamonanngay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs");
});

app.post("/themdichvungay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs");
});

app.post("/xoadichvungay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs");
});

app.post("/suadichvungay", async (req, res) => {
  res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs");
});

app.post("/thaydoithamso", async (req, res) => {
  res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo_Sua.ejs");
});

// end staff thay doi quy dinh

// staff lobby

app.post("/updatelobby", async (req, res) => {
  res.render("staff/lobby/updatelobby.ejs");
});

app.post("/deletelobby", async (req, res) => {
  res.render("staff/lobby/deletelobby.ejs");
});

app.post("/createlobby", async (req, res) => {
  res.render("staff/lobby/createlobby.ejs");
});

app.post("/xacnhanxoasanh", async (req, res) => {
  res.render("staff/lobby/deletelobbydone.ejs");
});

// end staff lobby

// staff
// user/main.ejs
// staff/Staff_MainScreen.ejs

app.post("/login", (req, res) => {
  res.render("login/login.ejs");
});

app.post("/dologin", async (req, res) => {
  const username = req.body.username;
  const matkhau = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.matkhau;
      if (matkhau === dbpassword) {
        res.render("user/main.ejs", {
          name: user.username,
          email: user.email,
          hovaten: user.hovaten,
          sdt: user.sodienthoai,
        });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/confirmchange", (req, res) => {
  res.render("user/confirmchange.ejs");
});

app.post("/dosignup", async (req, res) => {
  const hovaten = req.body.hovaten;
  const username = req.body.username;
  const email = req.body.email;
  const matkhau = req.body.matkhau;
  const sodienthoai = req.body.sodienthoai;

  const result = await db.query(
    "INSERT INTO users (username, hovaten, email, matkhau, sodienthoai) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [username, hovaten, email, matkhau, sodienthoai]
  );

  res.render("login/login.ejs");
});

app.post("/signup", (req, res) => {
  res.render("login/signup.ejs");
});

app.post("/tiepnhansanh", (req, res) => {
  res.render("staff/lobby/lobby.ejs");
});

app.post("/tracuu", (req, res) => {
  res.render("staff/tracuu/Staff_LookUp.ejs");
});

app.post("/lapbaocao", (req, res) => {
  res.render("staff/baocao/Staff_MonthlyReport.ejs");
});

let table_data = [
  {
    code: "HD01",
    order_number: "P001",
    lobby: "Bạch Kim I",
    booking_date: "10/3/2024",
    eating_date: "20/4/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD02",
    order_number: "P002",
    lobby: "Bạch Kim II",
    booking_date: "15/3/2024",
    eating_date: "22/4/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD03",
    order_number: "P003",
    lobby: "Bạch Kim III",
    booking_date: "10/4/2024",
    eating_date: "24/4/2024",
    status: "Đã thanh toán",
  },
  {
    code: "HD04",
    order_number: "P004",
    lobby: "Tinh Anh I",
    booking_date: "29/4/2024",
    eating_date: "15/5/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD05",
    order_number: "P005",
    lobby: "Ruby I",
    booking_date: "10/5/2024",
    eating_date: "1/6/2024",
    status: "Đã thanh toán",
  },
];
app.post("/laphoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill.ejs", {
    table_data: table_data,
  });
});

app.post("/chitiethoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
    table_data: table_data,
  });
});

app.post("/thongtin", (req, res) => {
  res.render("staff/staffinfo.ejs");
});

//ADMIN

app.post("/adminmain", async (req, res) => {
  res.redirect("/main");
});

app.post("/deleteuser", async (req, res) => {
  const username = req.body.usernamexoa;
  console.log(username);
  const result = await db.query(
    "DELETE FROM nguoidung WHERE tendangnhap = $1",
    [username]
  );
  res.redirect("/main");
});

app.post("/deleteuserdone", async (req, res) => {
  res.render("admin/deleteuserdone.ejs");
});

app.post("/updateuser", async (req, res) => {
  const username = req.body.usernamecapnhat;
  console.log(username);
  const result = await db.query(
    "select * FROM nguoidung WHERE tendangnhap = $1",
    [username]
  );
  res.render("admin/updateuser.ejs", {
    chitiet: result.rows,
  });
});

app.post("/doupdateuser", async (req, res) => {
  const tennguoidung = req.body.tennguoidung;
  const tendangnhap = req.body.tendangnhap;
  const email = req.body.email;
  const sodienthoai = req.body.sodienthoai;
  const manhom = req.body.manhom;
  console.log("sdt", manhom);

  console.log(tendangnhap);
  const result = await db.query(
    "UPDATE nguoidung SET TenNguoiDung = $1,  Email= $2, sdt = $3, manhom = $4 WHERE TenDangNhap=$5;",
    [tennguoidung, email, sodienthoai, manhom, tendangnhap]
  );
  res.redirect("/main");
});

app.post("/createuser", async (req, res) => {
  res.render("admin/createuser.ejs");
});

app.post("/create_user", async (req, res) => {
  const username = req.body.username;
  const loginame = req.body.loginame;
  const matkhau = req.body.password;
  const email = req.body.email;
  const sdt = req.body.SDT;
  const quyen = req.body.quyen;

  try {
    const result = await db.query(
      "INSERT INTO nguoidung (TenDangNhap, MatKhau, TenNguoiDung, MaNhom, Email, SDT, TinhTrang) VALUES($1, $2, $3, $4, $5,$6,'Còn hoạt động') RETURNING *;",
      [loginame, matkhau, username, quyen, email, sdt]
    );
    res.send("Người dùng mới đã được tạo");
  } catch (err) {
    console.log(err);
  }
  const table = await db.query("SELECT * FROM nguoidung");

  res.render("admin/main.ejs", { table: table.rows });
});
app.get("/adminmain", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM nguoidung");

    res.render("admin/main.ejs", { table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/timkiemuser", async (req, res) => {
  const username = req.body.finduser;
  // const username_ = req.body.chitiet;
  console.log(username);
  try {
    const result = await db.query(
      "SELECT * FROM nguoidung where tendangnhap = $1",
      [username]
    );
    res.render("admin/main.ejs", { table: result.rows });
    console.log(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post("/chitietuser", async (req, res) => {
  const username = req.body.finduser;
  const username_ = req.body.chitiet;
  try {
    const result = await db.query(
      "SELECT * FROM nguoidung WHERE tennguoidung = $1",
      [username]
    );
    const result_ = await db.query(
      "SELECT * FROM nguoidung WHERE tennguoidung = $1",
      [username_]
    );
    res.render("admin/main.ejs", {
      table: result.rows,
      chitiet: username_.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/userinfo", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/dattiec", async (req, res) => {
  res.render("user/dattiec/dattiec.ejs");
});

app.post("/userthemmonan", async (req, res) => {
  res.render("user/dattiec/themmonan.ejs");
});

app.post("/userthemdichvu", async (req, res) => {
  res.render("user/dattiec/themdichvu.ejs");
});

app.post("/usertracuu", async (req, res) => {
  res.render("user/tracuu/UserLookUp.ejs");
});

app.post("/logout", async (req, res) => {
  res.render("login/login.ejs");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

//--------------------------------------------------
app.post("/tiepnhansanh", async (req, res) => {
  const masanh = req.body.loaixacdinh;

  try {
    const sanhhienthilayve = await db.query(
      "SELECT * FROM sanh WHERE masanh = $1",
      [masanh]
    );
    const sanhhienthi = sanhhienthilayve.rows;
    console.log(sanhhienthi);
    const danhsachsanhlayve = await db.query("SELECT * FROM sanh");
    const danhsachsanh = danhsachsanhlayve.rows;
    const danhsachloaisanhlayve = await db.query("SELECT * FROM loaisanh");
    const danhsachloaisanh = danhsachloaisanhlayve.rows;

    for (let i = 0; i < danhsachsanh.length; i++) {
      for (let j = 0; j < danhsachloaisanh.length; j++) {
        let sanh = danhsachsanh[i].maloaisanh;
        sanh = sanh[0];
        let loaisanh = danhsachloaisanh[j].maloaisanh;
        if (sanh === loaisanh) {
          danhsachsanh[i].dongiabantoithieu =
            danhsachloaisanh[j].dongiabantoithieu;
        }
      }
    }

    res.render("staff/lobby/lobby.ejs", {
      danhsachsanh: danhsachsanh,
      danhsachloaisanh: danhsachloaisanh,
      sanhhienthi: sanhhienthi,
    });
  } catch (err) {
    console.log(err);
  }
});
