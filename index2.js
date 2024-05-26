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

// bien
let user = -1;
const tinhtrang1 = "Còn phục vụ";
let userobject;

app.get("/", (req, res) => {
  if (user === -1) res.render("login/login.ejs");
  else res.render("admin/main.ejs");
});

// Staff_LobbyReception
// Staff_MainScreen

app.get("/main", async (req, res) => {
  res.render("user/main.ejs", {
    name: userobject.tendangnhap,
    email: userobject.email,
    hovaten: userobject.tennguoidung,
    sdt: userobject.sdt,
  });
});

app.get("/tiepnhansanh", async (req, res) => {
  const masanh = req.body.loaixacdinh;
  const masanhcapnhat = req.body.capnhat;

  try {
    const sanhhienthilayve = await db.query(
      "SELECT * FROM sanh WHERE masanh = $1",
      [masanh]
    );
    const sanhhienthi = sanhhienthilayve.rows[0];
    const danhsachsanhlayve = await db.query("SELECT * FROM sanh");
    const danhsachsanh = danhsachsanhlayve.rows;
    const danhsachloaisanhlayve = await db.query("SELECT * FROM loaisanh");
    const danhsachloaisanh = danhsachloaisanhlayve.rows;

    for (let i = 0; i < danhsachsanh.length; i++) {
      for (let j = 0; j < danhsachloaisanh.length; j++) {
        let sanh = danhsachsanh[i].maloaisanh;
        sanh = sanh.split(" ").join("");
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

app.post("/tiepnhansanh", async (req, res) => {
  const masanh = req.body.loaixacdinh;
  const masanhcapnhat = req.body.capnhat;
  console.log("hello ", masanhcapnhat);

  try {
    const sanhhienthilayve = await db.query(
      "SELECT * FROM sanh WHERE masanh = $1",
      [masanh]
    );
    const sanhhienthi = sanhhienthilayve.rows[0];
    console.log(sanhhienthi);
    const danhsachsanhlayve = await db.query("SELECT * FROM sanh");
    const danhsachsanh = danhsachsanhlayve.rows;
    const danhsachloaisanhlayve = await db.query("SELECT * FROM loaisanh");
    const danhsachloaisanh = danhsachloaisanhlayve.rows;

    danhsachsanh.sort((a, b) => {
      if (a.masanh < b.masanh) return -1;
      if (a.masanh > b.masanh) return 1;
      return 0;
    });

    for (let i = 0; i < danhsachsanh.length; i++) {
      for (let j = 0; j < danhsachloaisanh.length; j++) {
        let sanh = danhsachsanh[i].maloaisanh;
        sanh = sanh.split(" ").join("");
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

app.post("/main", async (req, res) => {
  if (userobject !== undefined) {
    res.render("user/main.ejs", {
      name: userobject.tendangnhap,
      email: userobject.email,
      hovaten: userobject.tennguoidung,
      sdt: userobject.sdt,
    });
  } else {
    res.render("user/main.ejs");
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
  const masanh = req.body.loaixacdinh;
  let masanhcapnhat = req.body.capnhat;
  masanhcapnhat = masanhcapnhat.split(" ").join("");

  const sanhhienthilayve = await db.query(
    "SELECT * FROM sanh WHERE masanh = $1",
    [masanhcapnhat]
  );
  let sanhhienthi = sanhhienthilayve.rows[0];
  sanhhienthi.masanh = sanhhienthi.masanh.split(" ").join("");
  sanhhienthi.tensanh = sanhhienthi.tensanh.split(" ").join("");
  sanhhienthi.maloaisanh = sanhhienthi.maloaisanh.split(" ").join("");
  // sanhhienthi.soluongbantoida = sanhhienthi.soluongbantoida.split(" ").join("");

  res.render("staff/lobby/updatelobby.ejs", {
    sanhhienthi: sanhhienthi,
  });
});

app.post("/doupdatelobby", async (req, res) => {
  const masanh = req.body.loaixacdinh;
  let masanhcapnhat = req.body.capnhat;
  masanhcapnhat = masanhcapnhat.split(" ").join("");
  const tensanh = req.body.tensanh;
  const loaisanh = req.body.loaisanh;
  const soluongbantoida = req.body.soluongbantoida;
  const ghichu = req.body.ghichu;

  const result = await db.query(
    "UPDATE sanh SET tensanh = $1, maloaisanh = $2, soluongbantoida = $3, ghichu = $4 WHERE masanh = $5 RETURNING *;",
    [tensanh, loaisanh, soluongbantoida, ghichu, masanhcapnhat]
  );

  res.redirect("/tiepnhansanh");
});

app.post("/deletelobby", async (req, res) => {
  const masanh = req.body.masanh;
  console.log(masanh);
  res.render("staff/lobby/deletelobby.ejs", {
    masanh: masanh,
  });
});

app.post("/createlobby", async (req, res) => {
  const result = await db.query("SELECT tenloaisanh FROM loaisanh");
  const danhsachloaisanh = result.rows;
  console.log(danhsachloaisanh);

  res.render("staff/lobby/createlobby.ejs", {
    tenloaisanh: danhsachloaisanh,
  });
});

app.post("/docreatelobby", async (req, res) => {
  const masanh = req.body.masanh;
  const tensanh = req.body.tensanh;
  const loaisanh = req.body.loaisanh;
  const soluongbantoida = req.body.soluongbantoida;
  const ghichu = req.body.ghichu;

  console.log("hi", soluongbantoida);

  const tinhtrang = "Còn phục vụ";

  const result = await db.query(
    "INSERT INTO sanh (masanh, tensanh, maloaisanh, soluongbantoida, ghichu, tinhtrang) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;",
    [masanh, tensanh, loaisanh, soluongbantoida, ghichu, tinhtrang1]
  );

  res.redirect("/tiepnhansanh");
});

app.post("/xacnhanxoasanh", async (req, res) => {
  const masanh = req.body.masanh;

  const tinhtrang = "Ngưng phục vụ";

  const result = await db.query(
    "UPDATE sanh SET tinhtrang = $1 WHERE masanh = $2 RETURNING *;",
    [tinhtrang, masanh]
  );

  res.render("staff/lobby/deletelobbydone.ejs");
});

// end staff lobby

// staff
// user/main.ejs
// staff/Staff_MainScreen.ejs

app.post("/login", (req, res) => {
  res.render("login/login.ejs");
});

let arr = [1, 2, 3];

app.post("/dologin", async (req, res) => {
  const username = req.body.username;
  const matkhau = req.body.password;

  try {
    const result = await db.query(
      "SELECT * FROM nguoidung WHERE TenDangNhap = $1",
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.matkhau;
      if (matkhau === dbpassword) {
        userobject = user;
        console.log(userobject);
        res.render("user/main.ejs", {
          name: userobject.tendangnhap,
          email: userobject.email,
          hovaten: userobject.tennguoidung,
          sdt: userobject.sdt,
        });
      } else {
        res.render("login/login.ejs", {
          thongbao: "mat khau sai",
        });
      }
    } else {
      // res.send("user does not exist");
      res.render("login/login.ejs", {
        thongbao: "nguoi dung khong ton tai",
      });
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
  res.render("staff/hoadon/Staff_ListBill.ejs");
});

app.post("/chitiethoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
    table_data: table_data,
  });
});

app.post("/thongtin", (req, res) => {
  res.render("staff/staffinfo.ejs");
});

app.post("/adminmain", async (req, res) => {
  res.render("admin/main.ejs");
});

app.post("/deleteuser", async (req, res) => {
  res.render("admin/deleteuser.ejs");
});

app.post("/deleteuserdone", async (req, res) => {
  res.render("admin/deleteuserdone.ejs");
});

app.post("/updateuser", async (req, res) => {
  res.render("admin/updateuser.ejs");
});

app.post("/createuser", async (req, res) => {
  res.render("admin/createuser.ejs");
});

// user

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

app.post("/thaydoithongtin", async (req, res) => {
  const sanhhienthilayve = await db.query(
    "SELECT * nguoidung WHERE masanh = $1",
    [masanh]
  );
  res.render("user/changeinfo/changeinfo.ejs");
});

app.post("/confirminfochange", async (req, res) => {
  res.render("user/changeinfo/confirminfochange.ejs");
});

app.post("/thaydoimatkhau", async (req, res) => {
  res.render("user/changeinfo/changepassword.ejs");
});

app.post("/confirmpasswordchange", async (req, res) => {
  res.render("user/changeinfo/confirmpasschange.ejs");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
