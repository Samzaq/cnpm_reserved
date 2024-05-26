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
// db.connect();
db.connect((err) => {
  if (err) {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", err);
  } else {
    console.log("Kết nối đến cơ sở dữ liệu thành công");
    // Bạn có thể thực hiện các thao tác khác tại đây
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let listmonan = [];
let listghichu = [];
let listsoluongmon = [];
let listdichvu = [];
let listghichudichvu = [];
let listsoluongdichvu = [];

let userprofile = {
  tendangnhap: "",
  matkhau: "",
  tennguoidung: "",
  manhom: "",
  email: "",
  sdt: "",
};
const tinhtrang1 = "Còn phục vụ";

app.get("/", async (req, res) => {
  res.render("login/login.ejs");
});

// Staff_LobbyReception
// Staff_MainScreen

app.get("/login", (req, res) => {
  res.render("login/login.ejs");
});

// staff thay doi quy dinh

// app.get("/", (req, res) => {
//   res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
// });

app.post("/thaydoiquydinh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/loaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/ca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/monan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/dichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/thamso", async (req, res) => {
  try {
    const apdungquydinhphatQuery = await db.query(
      "SELECT giatri FROM thamso WHERE tenthamso = 'ApDungQuyDinhPhat'"
    );
    const tiletienphatQuery = await db.query(
      "SELECT giatri FROM thamso WHERE tenthamso = 'TileTienPhat'"
    );
    const apdungquydinhphat = apdungquydinhphatQuery.rows[0].giatri;
    const tiletienphat = tiletienphatQuery.rows[0].giatri;
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", {
      tilephat: tiletienphat,
      quydinhphat: apdungquydinhphat === 1 ? true : false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/themloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoaloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query(
      "SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", {
      table: table.rows,
      MLS: MLS.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/sualoaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query(
      "SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", {
      table: table.rows,
      MLS: MLS.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/themca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query(
      "SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", {
      table: table.rows,
      MC: MC.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/suaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query(
      "SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {
      table: table.rows,
      MC: MC.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/themmonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query(
      "SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", {
      table: table.rows,
      MMA: MMA.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/suamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query(
      "SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {
      table: table.rows,
      MMA: MMA.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/themdichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {
      table: table.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichvu_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query(
      "SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", {
      table: table.rows,
      MDV: MDV.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/suadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query(
      "SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'"
    );
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {
      table: table.rows,
      MDV: MDV.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/themloaisanhngay", async (req, res) => {
  try {
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh");
    const Table = await db.query("SELECT * FROM loaisanh");
    const maloaisanh = req.body.maloaisanh.trim();
    const tenloaisanh = req.body.tenloaisanh.trim();
    let dongiabantoithieu = req.body.dongiabantoithieu;
    dongiabantoithieu = parseInt(dongiabantoithieu);
    if (dongiabantoithieu < 0) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {
        DGBTTAm: "Đơn giá bàn tối thiểu phải là số không âm!",
        table: Table.rows,
      });
    } else if (maloaisanh.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {
        MLSlen: "Mã loại sảnh không được quá 10 ký tự!",
        table: Table.rows,
      });
    } else {
      const maloaisanhExists = MLS.rows.some(
        (row) => row.maloaisanh.trim() === maloaisanh
      );
      if (maloaisanhExists) {
        res.render(
          "staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs",
          { MLSTT: "Mã loại sảnh đã tồn tại!", table: Table.rows }
        );
      } else {
        await db.query(
          "INSERT INTO loaisanh (maloaisanh, tenloaisanh, dongiabantoithieu, tinhtrang) VALUES ($1, $2, $3, $4)",
          [maloaisanh, tenloaisanh, dongiabantoithieu, "Còn phục vụ"]
        );

        const updatedTable = await db.query("SELECT * FROM loaisanh");
        res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
          table: updatedTable.rows,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoaloaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    await db.query(
      "UPDATE loaisanh SET tinhtrang = 'Ngưng phục vụ' WHERE maloaisanh = $1",
      [maloaisanh]
    );
    const updatedTable = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/sualoaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    const tenloaisanh = req.body.tenloaisanh;
    const dongiabantoithieu = req.body.dongiabantoithieu;
    const Table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query(
      "SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'"
    );
    if (dongiabantoithieu < 0) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", {
        DGBTTAm: "Đơn giá bàn tối thiểu phải là số không âm!",
        table: Table.rows,
        MLS: MLS.rows,
      });
    } else {
      await db.query(
        "UPDATE loaisanh SET tenloaisanh = $1, dongiabantoithieu = $2 WHERE maloaisanh = $3",
        [tenloaisanh, dongiabantoithieu, maloaisanh]
      );
      const updatedTable = await db.query("SELECT * FROM loaisanh");
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {
        table: updatedTable.rows,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/themcangay", async (req, res) => {
  try {
    const allCa = await db.query("SELECT * FROM ca");
    const allCaAvb = await db.query(
      "SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'"
    );
    const maca = req.body.maca.trim();
    const tenca = req.body.tenca.trim();
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    const Table = await db.query("SELECT * FROM ca");
    if (giobatdau >= gioketthuc) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
          GBDGKT: "Giờ bắt đầu và giờ kết thúc không hợp lệ!",
          table: Table.rows,
        });
      return;
    }
    if (maca.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
        MClen: "Mã ca không được quá 10 ký tự!",
        table: Table.rows,
      });
    }
    const overlapCa = allCaAvb.rows.some(
      (ca) =>
        (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) ||
        (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc)
    );
    if (overlapCa) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
          TrungCa: "Ca đã trùng với ca đã tồn tại!",
          table: Table.rows,
        });
      return;
    }
    const macaExists = allCa.rows.some((row) => row.maca.trim() === maca);
    if (macaExists) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
          MCTT: "Mã ca đã tồn tại!",
          table: Table.rows,
        });
      return;
    }
    await db.query(
      "INSERT INTO ca (maca, tenca, giobatdau, gioketthuc, tinhtrang) VALUES ($1, $2, $3, $4, $5)",
      [maca, tenca, giobatdau, gioketthuc, "Còn phục vụ"]
    );
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoacangay", async (req, res) => {
  try {
    const maca = req.body.maca;
    await db.query(
      "UPDATE ca SET tinhtrang = 'Ngưng phục vụ' WHERE maca = $1",
      [maca]
    );
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/suacangay", async (req, res) => {
  try {
    const allCaAvb = await db.query(
      "SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'"
    );
    const MC = await db.query(
      "SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'"
    );
    const maca = req.body.maca;
    const tenca = req.body.tenca;
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    const Table = await db.query("SELECT * FROM ca");
    if (giobatdau >= gioketthuc) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {
          MC: MC.rows,
          GBDGKT: "Giờ bắt đầu và giờ kết thúc không hợp lệ!",
          table: Table.rows,
        });
      return;
    }
    const overlapCa = allCaAvb.rows.some(
      (ca) =>
        (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) ||
        (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc)
    );
    if (overlapCa) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {
          MC: MC.rows,
          TrungCa: "Ca đã trùng với ca đã tồn tại!",
          table: Table.rows,
        });
      return;
    }
    await db.query(
      "UPDATE ca SET tenca = $1, giobatdau = $2, gioketthuc = $3 WHERE maca = $4",
      [tenca, giobatdau, gioketthuc, maca]
    );
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

app.post("/themmonanngay", async (req, res) => {
  try {
    const MMA = await db.query("SELECT mamonan FROM monan");
    const mamonan = req.body.mamonan.trim();
    const tenmonan = req.body.tenmonan.trim();
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM monan");
    if (dongia < 0) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
          DONGIA: "Đơn giá phải là số không âm!",
          table: Table.rows,
        });
    } else if (mamonan.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
        MMAlen: "Mã món ăn không được quá 10 ký tự!",
        table: Table.rows,
      });
    } else {
      const mamonanExists = MMA.rows.some(
        (row) => row.mamonan.trim() === mamonan
      );
      if (mamonanExists) {
        res
          .status(500)
          .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
            MMATT: "Mã món ăn đã tồn tại!",
            table: Table.rows,
          });
      } else {
        await db.query(
          "INSERT INTO monan (mamonan, tenmonan, dongia, tinhtrang) VALUES ($1, $2, $3, $4)",
          [mamonan, tenmonan, dongia, "Còn phục vụ"]
        );

        const updatedTable = await db.query("SELECT * FROM monan");
        res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {
          table: updatedTable.rows,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    await db.query(
      "UPDATE monan SET tinhtrang = 'Ngưng phục vụ' WHERE mamonan = $1",
      [mamonan]
    );
    const updatedTable = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/suamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    const tenmonan = req.body.tenmonan;
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM monan");
    const MMA = await db.query(
      "SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'"
    );
    if (dongia < 0) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {
          MMA: MMA.rows,
          DONGIA: "Đơn giá phải là số không âm!",
          table: Table.rows,
        });
    } else {
      await db.query(
        "UPDATE monan SET tenmonan = $1, dongia = $2 WHERE mamonan = $3",
        [tenmonan, dongia, mamonan]
      );
      const updatedTable = await db.query("SELECT * FROM monan");
      res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {
        table: updatedTable.rows,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/themdichvungay", async (req, res) => {
  try {
    const MDV = await db.query("SELECT madichvu FROM dichvu");
    const madichvu = req.body.madichvu.trim();
    const tendichvu = req.body.tendichvu.trim();
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM dichvu");
    if (dongia < 0) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {
          DONGIA: "Đơn giá phải là số không âm!",
          table: Table.rows,
        });
    } else if (madichvu.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {
        MDVlen: "Mã dịch vụ không được quá 10 ký tự!",
        table: Table.rows,
      });
    } else {
      const madichvuExists = MDV.rows.some(
        (row) => row.madichvu.trim() === madichvu
      );
      if (madichvuExists) {
        res
          .status(500)
          .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {
            MDVTT: "Mã dịch vụ đã tồn tại!",
            table: Table.rows,
          });
      } else {
        await db.query(
          "INSERT INTO dichvu (madichvu, tendichvu, dongia, tinhtrang) VALUES ($1, $2, $3, $4)",
          [madichvu, tendichvu, dongia, "Còn phục vụ"]
        );

        const updatedTable = await db.query("SELECT * FROM dichvu");
        res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {
          table: updatedTable.rows,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/xoadichvungay", async (req, res) => {
  try {
    const madichvu = req.body.madichvu;
    await db.query(
      "UPDATE dichvu SET tinhtrang = 'Ngưng phục vụ' WHERE madichvu = $1",
      [madichvu]
    );
    const updatedTable = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {
      table: updatedTable.rows,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/suadichvungay", async (req, res) => {
  try {
    const MDV = await db.query(
      "SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'"
    );
    const Table = await db.query("SELECT * FROM dichvu");
    const madichvu = req.body.madichvu;
    const tendichvu = req.body.tendichvu;
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res
        .status(500)
        .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {
          DONGIA: "Đơn giá phải là số không âm!",
          table: Table.rows,
          MDV: MDV.rows,
        });
    } else {
      await db.query(
        "UPDATE dichvu SET tendichvu = $1, dongia = $2 WHERE madichvu = $3",
        [tendichvu, dongia, madichvu]
      );
      const updatedTable = await db.query("SELECT * FROM dichvu");
      res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoidichVu.ejs", {
        table: updatedTable.rows,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {
        errorFromServer: "Lỗi hệ thống!",
      });
  }
});

app.post("/thaydoithamso", async (req, res) => {
  try {
    const apDungQuyDinhPhat = req.body.quydinhphat === "true" ? 1 : 0;
    const tiLeTienPhat = parseFloat(req.body.tilephat);
    if (tiLeTienPhat < 0) {
      res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", {
        TLTP: "Tỉ lệ tiền phạt phải là số không âm!",
        quydinhphat: apDungQuyDinhPhat,
        tilephat: tiLeTienPhat,
      });
      return;
    }
    await db.query(
      "UPDATE thamso SET giatri = $1 WHERE tenthamso = 'TileTienPhat'",
      [tiLeTienPhat]
    );
    await db.query(
      "UPDATE thamso SET giatri = $1 WHERE tenthamso = 'ApDungQuyDinhPhat'",
      [apDungQuyDinhPhat]
    );
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo_Sua.ejs");
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", {
      errorFromServer: "Lỗi hệ thống!",
    });
  }
});

// end staff thay doi quy dinh

// staff lobby

app.post("/updatelobby", async (req, res) => {
  const masanh = req.body.loaixacdinh;
  let masanhcapnhat = req.body.capnhat;
  // masanhcapnhat = masanhcapnhat.split(" ").join("");
  const result = await db.query("SELECT tenloaisanh FROM loaisanh");
  const danhsachloaisanh = result.rows;
  const sanhhienthilayve = await db.query(
    "SELECT * FROM sanh WHERE masanh = $1",
    [masanhcapnhat]
  );
  let sanhhienthi = sanhhienthilayve.rows[0];
  // sanhhienthi.masanh = sanhhienthi.masanh.split(" ").join("");
  // sanhhienthi.tensanh = sanhhienthi.tensanh.split(" ").join("");
  // sanhhienthi.maloaisanh = sanhhienthi.maloaisanh.split(" ").join("");
  // sanhhienthi.soluongbantoida = sanhhienthi.soluongbantoida.split(" ").join("");

  res.render("staff/lobby/updatelobby.ejs", {
    sanhhienthi: sanhhienthi,
    tenloaisanh: danhsachloaisanh,
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
  const masanh = req.body.masanh.trim();
  const tensanh = req.body.tensanh;
  const loaisanh = req.body.loaisanh;
  const soluongbantoida = req.body.soluongbantoida;
  const ghichu = req.body.ghichu;
  const MS = await db.query("SELECT masanh FROM sanh");
  console.log("hi", soluongbantoida);
  const masanhExists = MS.rows.some((row) => row.masanh.trim() === masanh);
  if (masanhExists) {
    res.send("Mã sảnh đã tồn tại!");
    return;
  }
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

// app.post("/docreatelobby", async (req, res) => {
//   const masanh = req.body.masanh;
//   const tensanh = req.body.tensanh;
//   const loaisanh = req.body.loaisanh;
//   const soluongbantoida = req.body.soluongbantoida;
//   const ghichu = req.body.ghichu;

//   console.log("hi", soluongbantoida);

//   const tinhtrang = "Còn phục vụ";

//   const result = await db.query(
//     "INSERT INTO sanh (masanh, tensanh, maloaisanh, soluongbantoida, ghichu, tinhtrang) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;",
//     [masanh, tensanh, loaisanh, soluongbantoida, ghichu, tinhtrang1]
//   );

//   res.redirect("/tiepnhansanh");
// });

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

app.post("/dologin", async (req, res) => {
  const username = req.body.username;
  const matkhau = req.body.password;
  console.log(username);
  try {
    const result = await db.query(
      "SELECT * FROM NGUOIDUNG WHERE TenDangNhap = $1",
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      userprofile = user;
      const dbpassword = user.matkhau;
      if (matkhau === dbpassword) {
        if (user.manhom == 2) {
          res.render("user/main.ejs", {
            name: user.tendangnhap,
            email: user.email,
            hovaten: user.tennguoidung,
            sdt: user.sdt,
          });
        } else if (user.manhom == 1) {
          res.render("staff/staffinfo.ejs", {
            name: user.tendangnhap,
            email: user.email,
            hovaten: user.tennguoidung,
            sdt: user.sdt,
          });
        } else if (user.manhom == 0) {
          res.redirect("/adminmain");
        }
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
  const nhaplaimatkhau = req.body.nhaplaimatkhau;
  const sodienthoai = req.body.sodienthoai;

  if (matkhau != nhaplaimatkhau) {
    res.send("Mật khẩu không khớp");
  } else
    try {
      const result = await db.query(
        "INSERT INTO NGUOIDUNG (TenDangNhap, TenNguoiDung, Email, MatKhau, SDT, manhom) VALUES($1, $2, $3, $4, $5, 2) RETURNING *;",
        [username, hovaten, email, matkhau, sodienthoai]
      );

      res.render("login/login.ejs");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

app.post("/signup", (req, res) => {
  res.render("login/signup.ejs");
});

app.get("/tiepnhansanh", async (req, res) => {
  const masanh = req.body.loaixacdinh;
  const masanhcapnhat = req.body.capnhat;

  try {
    const sanhhienthilayve = await db.query(
      "SELECT * FROM sanh WHERE masanh = $1 and tinhtrang = 'Còn phục vụ'",
      [masanh]
    );
    const sanhhienthi = sanhhienthilayve.rows[0];
    const danhsachsanhlayve = await db.query(
      "SELECT * FROM sanh where tinhtrang = 'Còn phục vụ'"
    );
    const danhsachsanh = danhsachsanhlayve.rows;
    const danhsachloaisanhlayve = await db.query(
      "SELECT * FROM loaisanh where tinhtrang = 'Còn phục vụ'"
    );
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
      "SELECT * FROM sanh WHERE masanh = $1 and tinhtrang = 'Còn phục vụ'",
      [masanh]
    );
    const sanhhienthi = sanhhienthilayve.rows[0];
    console.log(sanhhienthi);
    const danhsachsanhlayve = await db.query(
      "SELECT * FROM sanh where tinhtrang = 'Còn phục vụ'"
    );
    const danhsachsanh = danhsachsanhlayve.rows;
    const danhsachloaisanhlayve = await db.query(
      "SELECT * FROM loaisanh where tinhtrang = 'Còn phục vụ'"
    );
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

app.post("/tracuu", async (req, res) => {
  const temp_lookup_table = await db.query(`
  select p.tenchure, p.tencodau, s.tensanh, TO_CHAR(p.ngaydaitiec, 'DD-MM-YYYY') AS ngaydaitiec, c.giobatdau, c.gioketthuc, sum(p.soluongban+p.sobandutru) as soluongban
  from phieudattiec p, sanh s, ca c
  where p.masanh = s.masanh and p.maca = c.maca
  group by p.tenchure, p.tencodau, s.tensanh, p.ngaydaitiec, c.giobatdau, c.gioketthuc
  `);

  const temp_lobby_selection = await db.query(`
  select tensanh
  from sanh
  where tinhtrang = 'Còn phục vụ'
  `);

  const temp_start_end_time = await db.query(`
    select giobatdau, gioketthuc
    from ca
  `);
  let start_end_time = temp_start_end_time.rows;
  let lobby_selection = temp_lobby_selection.rows;
  let lookup_table = temp_lookup_table.rows;
  res.render("staff/tracuu/Staff_LookUp.ejs", {
    lookup_table: lookup_table,
    lobby_selection: lobby_selection,
    start_end_time: start_end_time,
  });
});

app.post("/laphoadon", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT H.mahoadon, H.sophieudattiec, S.tensanh, TO_CHAR(P.ngaydattiec, 'DD-MM-YYYY') AS ngaydattiec, TO_CHAR(P.ngaydaitiec, 'DD-MM-YYYY') AS ngaydaitiec, H.tinhtrang 
      FROM HOADON H, PHIEUDATTIEC P, SANH S 
      WHERE H.sophieudattiec = P.sophieudattiec AND P.masanh = S.masanh
      ORDER BY H.mahoadon
      `);
    const hoadons = result.rows;
    res.render("staff/hoadon/Staff_ListBill.ejs", {
      hoadons: hoadons,
    });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Sever Error");
  }
});

app.get("/laphoadon", async (req, res) => {
  const bill_id = req.query.bill_id;
  console.log(bill_id);
  try {
    //update tinh trang
    let temp = await db.query(
      `
      update hoadon
      set tinhtrang = 'Đã thanh toán'
      where mahoadon = $1
    `,
      [bill_id]
    );
    //update so tien con lai
    temp = await db.query(
      `
    update hoadon
    set conlai = 0
    where mahoadon = $1
    `,
      [bill_id]
    );
    //update lai tongtienhoadon +=phithanhthoantre
    temp = await db.query(
      `
      update hoadon
      set tongtienhoadon = tongtienhoadon + phithanhtoantre
      where mahoadon = $1 
    `,
      [bill_id]
    );

    const result = await db.query(`
      SELECT H.mahoadon, H.sophieudattiec, S.tensanh, TO_CHAR(P.ngaydattiec, 'DD-MM-YYYY') AS ngaydattiec, TO_CHAR(P.ngaydaitiec, 'DD-MM-YYYY') AS ngaydaitiec, H.tinhtrang 
      FROM HOADON H, PHIEUDATTIEC P, SANH S 
      WHERE H.sophieudattiec = P.sophieudattiec AND P.masanh = S.masanh
      ORDER BY H.mahoadon
      `);
    const hoadons = result.rows;
    res.render("staff/hoadon/Staff_ListBill.ejs", {
      hoadons: hoadons,
    });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Sever Error");
  }
});

//QUERY 1 HOA DON THEO MA HOA DON
app.post("/timkiemhoadon", async (req, res) => {
  const billId = req.body.bill_id;
  const searchPattern = `%${billId}%`; // Mẫu tìm kiếm với ký tự %
  try {
    const result = await db.query(
      `
      SELECT H.mahoadon, H.sophieudattiec, S.tensanh, TO_CHAR(P.ngaydattiec, 'DD-MM-YYYY') AS ngaydattiec, TO_CHAR(P.ngaydaitiec, 'DD-MM-YYYY') AS ngaydaitiec, H.tinhtrang 
      FROM HOADON H
      JOIN PHIEUDATTIEC P ON H.sophieudattiec = P.sophieudattiec
      JOIN SANH S ON P.masanh = S.masanh
      WHERE H.mahoadon::VARCHAR ilike $1
    `,
      [searchPattern]
    );

    if (result.rows.length > 0) {
      const hoadons = result.rows;
      res.render("staff/hoadon/Staff_ListBill.ejs", {
        hoadons: hoadons,
      });
    } else {
      res.send("Không tìm thấy hóa đơn với mã này");
    }
  } catch (error) {
    console.error("Lỗi khi thực hiện truy vấn", error.stack);
    res.status(500).send("Lỗi server");
  }
});
//CHI TIET HOA DON CHUA THANH TOAN
app.post("/chitiethoadon", async (req, res) => {
  const BillId = req.body.bill_id;
  const BillStatus = req.body.bill_status;
  console.log(BillId);
  console.log(typeof BillId);
  console.log(BillStatus);
  console.log(typeof BillStatus);
  try {
    //thong tin chung cua tiec cuoi
    const temp_general_info = await db.query(
      `
        select H.mahoadon, H.sophieudattiec, P.tenchure, P.tencodau, P.dongiaban, TO_CHAR(P.ngaydaitiec, 'DD-MM-YYYY') AS ngaydaitiec, P.tongtienban 
        from HOADON H, PHIEUDATTIEC P, SANH S
        where H.sophieudattiec = P.sophieudattiec and P.masanh = S.masanh and H.mahoadon::VARCHAR = $1
      `,
      [BillId]
    );
    console.log("song sot1");

    const general_info = temp_general_info.rows;
    let num_table = await db.query(
      `
        select sum(p.soluongban + p.sobandutru) as soluongban
        from phieudattiec p, hoadon h
        where h.sophieudattiec = p.sophieudattiec and h.mahoadon::VARCHAR = $1
      `,
      [BillId]
    );
    console.log("song sot2");

    num_table = num_table.rows;
    num_table = num_table[0].soluongban;

    //thong tin chi tiet dich vu
    const temp_service_info = await db.query(
      `
        select d.tendichvu, c.soluong, c.dongia, c.thanhtien, c.ghichu
        from hoadon h, phieudattiec p, chitietdichvu c, dichvu d 
        where h.sophieudattiec = p.sophieudattiec and p.sophieudattiec = c.sophieudattiec  and c.madichvu = d.madichvu 
            and h.mahoadon = $1
       `,
      [BillId]
    );
    console.log("song sot3");
    const service_info = temp_service_info.rows;

    // tong tien dich vu
    const temp_service_total_price = await db.query(
      `
       select  tongtiendichvu
       from hoadon  
       where mahoadon = $1
     `,
      [BillId]
    );
    console.log("song sot4");
    let service_total_price = temp_service_total_price.rows;
    service_total_price = service_total_price[0].tongtiendichvu;

    //tong tien hoa don
    const temp_bill_total_price = await db.query(
      `
       select  tongtienhoadon
       from hoadon  
       where mahoadon = $1
     `,
      [BillId]
    );
    console.log("song sot5");
    let bill_total_price = temp_bill_total_price.rows;
    bill_total_price = bill_total_price[0].tongtienhoadon;

    //tien dat coc
    const temp_deposit = await db.query(
      `
       select P.tiendatcoc  
       from HOADON H, PHIEUDATTIEC P
       where H.sophieudattiec = P.sophieudattiec and MaHoaDon = $1
     `,
      [BillId]
    );
    console.log("song sot6");
    let deposit = temp_deposit.rows;
    deposit = deposit[0].tiendatcoc;

    //Kiểm tra ngày thanh toán có cần cập nhật hay không. Nếu có nghĩa là thanh toán trễ-> tính tiền phạt
    let paying_date;
    let late_fee;

    let fining_rule = await db.query(`
      select giatri
      from thamso
      where tenthamso = 'ApDungQuyDinhPhat'
      `);
    fining_rule = fining_rule.rows;
    fining_rule = fining_rule[0].giatri;

    if (BillStatus == "Chưa thanh toán") {
      //update ngay thanh toan khi truy cap vao bill chua thanh toan
      const check_paying_date = await db.query(
        `
        update HOADON
        set ngaythanhtoan = CURRENT_DATE
        where ngaythanhtoan < CURRENT_DATE and mahoadon =  $1;
        `,
        [BillId]
      );
      //Ngay thanh toan
      const temp_paying_date = await db.query(
        `
        select TO_CHAR(ngaythanhtoan, 'DD-MM-YYYY') as ngaythanhtoan
        from hoadon
        where mahoadon = $1
        `,
        [BillId]
      );

      paying_date = temp_paying_date.rows;

      if (fining_rule == 1) {
        //So ngay tre
        const temp_num_late_date = await db.query(
          `
          WITH ngaythanhtoan AS (
          SELECT ngaythanhtoan
          FROM hoadon
          WHERE mahoadon = $1
          ),
          ngaylaphoadon AS (
          SELECT ngaylaphoadon
          FROM hoadon
          WHERE mahoadon = $1
          )
          SELECT (ngaythanhtoan.ngaythanhtoan - ngaylaphoadon.ngaylaphoadon) AS difference_in_days
          FROM ngaythanhtoan, ngaylaphoadon;
          `,
          [BillId]
        );
        let num_late_date = temp_num_late_date.rows;
        num_late_date = num_late_date[0].difference_in_days;

        //Tinh phi thanh toan tre
        const temp_fining_rate = await db.query(`
          select giatri
          from thamso
          where tenthamso = 'TileTienPhat'
          `);
        let fining_rate = temp_fining_rate.rows;
        fining_rate = fining_rate[0].giatri;

        late_fee = fining_rate * num_late_date * bill_total_price;

        //update phi thanh toan tre vao DB
        let temp = await db.query(
          `
          update hoadon
          set phithanhtoantre = $1
          where mahoadon = $2
          `,
          [late_fee, BillId]
        );
        //update tien con lai vao DB
        // 1. lay so tien con lai truoc do
        // let temp_remaining_money = await db.query(`
        // select conlai
        // from hoadon
        // where mahoadon = $1
        // `, [BillId]);
        //   // 2.tinh so tien con lai moi
        // let remaining_money = temp_remaining_money.rows;
        // remaining_money = remaining_money[0].conlai;
        let remaining_money = bill_total_price - deposit + late_fee;

        // 3.update vao DB
        temp = await db.query(
          `
          update hoadon
          set conlai = $1
          where mahoadon = $2
          `,
          [remaining_money, BillId]
        );
        //update tinhtrang
        res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
          general_info: general_info,
          num_table: num_table,
          service_info: service_info,
          service_total_price: service_total_price,
          bill_total_price: bill_total_price,
          deposit: deposit,
          late_fee: late_fee,
          remaining_money: remaining_money,
          paying_date: paying_date,
        });
      } else {
        let temp_remaining = bill_total_price - deposit;

        let temp_remaining_money = await db.query(
          `
          update hoadon
          set conlai = $1
          where mahoadon = $2
          `,
          [temp_remaining, BillId]
        );

        res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
          general_info: general_info,
          num_table: num_table,
          service_info: service_info,
          service_total_price: service_total_price,
          bill_total_price: bill_total_price,
          deposit: deposit,
          late_fee: 0,
          remaining_money: temp_remaining,
          paying_date: paying_date,
        });
      }
    } else {
      //bill da thanh toan
      //select ngay thanh toan
      const temp_paying_date = await db.query(
        `
            select TO_CHAR(ngaythanhtoan, 'DD-MM-YYYY') as ngaythanhtoan
            from hoadon
            where mahoadon = $1
          `,
        [BillId]
      );
      paying_date = temp_paying_date.rows;

      //select phi thanh toan tre
      let temp_late_fee = await db.query(
        `
        select phithanhtoantre
        from hoadon
        where mahoadon = $1
        `,
        [BillId]
      );
      let late_fee = temp_late_fee.rows;
      late_fee = late_fee[0].phithanhtoantre;

      //select con lai
      let temp_remaining_money = await db.query(
        `
          select conlai
          from hoadon
          where mahoadon = $1
        `,
        [BillId]
      );
      let remaining_money = temp_remaining_money.rows;
      remaining_money = remaining_money[0].conlai;
      res.render("staff/hoadon/Staff_ListBill_PaidBill.ejs", {
        general_info: general_info,
        num_table: num_table,
        service_info: service_info,
        service_total_price: service_total_price,
        bill_total_price: bill_total_price,
        deposit: deposit,
        late_fee: late_fee,
        remaining_money: remaining_money,
        paying_date: paying_date,
      });
    }
  } catch (error) {
    console.error("Lỗi khi thực hiện truy vấn", error.stack);
    res.status(500).send("Lỗi server");
  }
});

app.post("/lapbaocao", async (req, res) => {
  try {
    const nam = 2024;
    const thang = 1;
    const result = await db.query(
      "SELECT DATE_PART('day', ngaylaphoadon) AS ngay, COUNT(*) AS soluongtieccuoi, SUM(tongtienhoadon) AS doanhthu FROM HOADON WHERE DATE_PART('year', ngaylaphoadon) = $1 AND DATE_PART('month', ngaylaphoadon) = $2 GROUP BY DATE_PART('day', ngaylaphoadon) ORDER BY ngay",
      [nam, thang]
    );
    const rows = result.rows;
    const totalDoanhThu = rows.reduce(
      (sum, row) => sum + parseFloat(row.doanhthu),
      0
    );
    const dataWithTyle = rows.map((row, index) => ({
      stt: index + 1,
      ngay: row.ngay,
      soluongtieccuoi: row.soluongtieccuoi,
      doanhthu: row.doanhthu,
      tyle: ((row.doanhthu / totalDoanhThu) * 100).toFixed(2) + "%",
    }));

    res.render("staff/baocao/Staff_MonthlyReport.ejs", {
      data: dataWithTyle,
      nam: nam,
      months: thang,
      totalDoanhThu: totalDoanhThu,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/baocao", async (req, res) => {
  try {
    const date = new Date();
    const homdattiec = date.getDate();
    let thangdattiec = date.getMonth();
    thangdattiec = thangdattiec + 1;
    const namdattiec = date.getFullYear();
    console.log("namdat ", namdattiec);
    const nam = req.body.nam;
    const thang = req.body.months;
    if (nam > namdattiec) {
      res.send("thoi gian khong hop le");
    } else {
      if (namdattiec == nam && thang >= thangdattiec) {
        res.send("thoi gian khong hop le");
      } else {
        const result = await db.query(
          "SELECT DATE_PART('day', ngaylaphoadon) AS ngay, COUNT(*) AS soluongtieccuoi, SUM(tongtienhoadon) AS doanhthu FROM HOADON WHERE DATE_PART('year', ngaylaphoadon) = $1 AND DATE_PART('month', ngaylaphoadon) = $2 GROUP BY DATE_PART('day', ngaylaphoadon) ORDER BY ngay",
          [nam, thang]
        );
        const rows = result.rows;
        console.log(rows);
        const totalDoanhThu = rows.reduce(
          (sum, row) => sum + parseFloat(row.doanhthu),
          0
        );
        const dataWithTyle = rows.map((row, index) => ({
          stt: index + 1,
          ngay: row.ngay,
          soluongtieccuoi: row.soluongtieccuoi,
          doanhthu: row.doanhthu,
          tyle: ((row.doanhthu / totalDoanhThu) * 100).toFixed(2) + "%",
        }));

        res.render("staff/baocao/Staff_MonthlyReport.ejs", {
          data: dataWithTyle,
          nam: nam,
          months: thang,
          totalDoanhThu: totalDoanhThu,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/thongtin", (req, res) => {
  res.render("staff/staffinfo.ejs", {
    name: userprofile.tendangnhap,
    email: userprofile.email,
    hovaten: userprofile.tennguoidung,
    sdt: userprofile.sdt,
  });
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

app.post("/adminmain", async (req, res) => {
  res.redirect("/adminmain");
});

app.post("/deleteuser", async (req, res) => {
  const username = req.body.usernamexoa;
  console.log(username);
  const result = await db.query(
    "DELETE FROM nguoidung WHERE tendangnhap = $1",
    [username]
  );
  res.redirect("/adminmain");
});

app.post("/deleteuserdone", async (req, res) => {
  res.render("admin/deleteuserdone.ejs");
});

// user /////////////////////////////////////////////////////////////

app.post("/userinfo", async (req, res) => {
  res.render("user/main.ejs", {
    name: userprofile.tendangnhap,
    email: userprofile.email,
    hovaten: userprofile.tennguoidung,
    sdt: userprofile.sdt,
  });
});

app.post("/userdichvu", async (req, res) => {
  res.render("user/dattiec/XoaDichVu.ejs");
});

app.post("/usertracuu", async (req, res) => {
  res.render("user/tracuu/UserLookUp.ejs");
});

// Thay đổi thông tin, mật khẩu
app.post("/changeinfo", async (req, res) => {
  res.render("user/changeinfo/changeinfo.ejs");
});

app.post("/changepassword", async (req, res) => {
  res.render("user/changeinfo/changepassword.ejs");
});

app.post("/logout", async (req, res) => {
  res.render("login/login.ejs");
});

app.post("/signout", async (req, res) => {
  res.render("login/login.ejs");
});

app.post("/changepassword", async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(400).send("New passwords do not match");
  }

  try {
    const result = await db.query(
      "SELECT MatKhau FROM NGUOIDUNG WHERE TenDangNhap = $1",
      [req.session.username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.matkhau;

      if (currentPassword === dbpassword) {
        const updateQuery =
          "UPDATE NGUOIDUNG SET MatKhau = $1 WHERE TenDangNhap = $2";
        await db.query(updateQuery, [newPassword, req.session.username]);
        res.redirect("/main");
      } else {
        res.status(400).send("Current password is incorrect");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/main", async (req, res) => {
  res.render("user/main.ejs", {
    name: userprofile.tendangnhap,
    email: userprofile.email,
    hovaten: userprofile.tennguoidung,
    sdt: userprofile.sdt,
  });
});

app.post("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.get("/dattiec", async (req, res) => {
  try {
    const caResult = await db.query(
      "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
    );
    const caOptions = caResult.rows;
    const sanhResult = await db.query(
      "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
    );
    const sanhOptions = sanhResult.rows;
    console.log(sanhOptions);
    console.log(caOptions);
    res.render("user/dattiec/dattiec.ejs", {
      caOptions: caOptions,
      sanhOptions: sanhOptions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/dattiec", async (req, res) => {
  try {
    const caResult = await db.query(
      "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
    );
    const caOptions = caResult.rows;
    const sanhResult = await db.query(
      "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
    );
    const sanhOptions = sanhResult.rows;

    res.redirect("/dattiec");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/userthemmonan", async (req, res) => {
  try {
    // Truy vấn cơ sở dữ liệu để lấy danh sách món ăn còn phục vụ từ bảng MONAN
    const monanResult = await db.query(
      "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
    );
    const monanOptions = monanResult.rows;
    // Render màn hình themmonan và truyền danh sách món ăn
    res.render("user/dattiec/themmonan.ejs", { monanOptions: monanOptions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/douserthemmonan", async (req, res) => {
  let checkboxes = req.body.checkboxes;
  let ghichu = req.body.ghichu;
  let soluongmon = req.body.soluongmon;

  console.log(ghichu);
  console.log(soluongmon);
  // const ghichu = req.body.;
  // console.log("value checkboxes: ");
  // console.log(typeof checkboxes);
  // console.log("value", checkboxes, "end");
  const monanResult = await db.query(
    "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
  );
  const monanOptions = monanResult.rows;
  if (typeof checkboxes == "string") {
    checkboxes = checkboxes.split(" ").join("");
    if (!listmonan.includes(checkboxes)) {
      listmonan.push(checkboxes);
      listghichu.push(ghichu[checkboxes]);
      listsoluongmon.push(soluongmon[checkboxes]);
    }
  } else if (typeof checkboxes == "object") {
    for (let i = 0; i < checkboxes.length; i++) {
      let value = checkboxes[i];
      // checkboxes[i] = value.split(" ").join("");
      console.log(checkboxes[i]);
    }

    for (let i = 0; i < checkboxes.length; i++) {
      if (!listmonan.includes(checkboxes[i])) {
        listmonan.push(checkboxes[i]);
        listsoluongmon.push(soluongmon[checkboxes[i]]);
        listghichu.push(ghichu[checkboxes[i]]);
      }
    }
  }
  const dichvuResult = await db.query(
    "SELECT * FROM dichvu WHERE TinhTrang = 'Còn phục vụ'"
  );
  const dichvuOptions = dichvuResult.rows;
  let list2 = [];
  for (let i = 0; i < listdichvu.length; i++) {
    const result = await db.query("SELECT * FROM dichvu WHERE madichvu = $1", [
      dichvuOptions[listdichvu[i]].madichvu,
    ]);
    list2.push(result.rows[0]);
  }
  let list1 = [];
  // for (let i = 0; i < checkboxes.length; i++) {
  //   if (!listmonan.includes(checkboxes[i])) {
  //     listghichu.push(checkboxes[i]);
  //   }
  // }
  // for (let i = 0; i < checkboxes.length; i++) {
  //   if (!listmonan.includes(checkboxes[i])) {
  //     listmonan.push(checkboxes[i]);
  //   }
  // }
  for (let i = 0; i < listmonan.length; i++) {
    const result = await db.query("SELECT * FROM monan WHERE mamonan = $1", [
      monanOptions[listmonan[i]].mamonan,
    ]);
    list1.push(result.rows[0]);
  }

  console.log(list1);
  try {
    const caResult = await db.query(
      "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
    );
    const caOptions = caResult.rows;
    const sanhResult = await db.query(
      "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
    );
    const sanhOptions = sanhResult.rows;
    res.render("user/dattiec/dattiec.ejs", {
      caOptions: caOptions,
      sanhOptions: sanhOptions,
      listmonan: list1,
      listghichu: listghichu,
      listsoluongmon: listsoluongmon,
      listdichvu: list2,
      listghichudichvu: listghichudichvu,
      listsoluongdichvu: listsoluongdichvu,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/userthemdichvu", async (req, res) => {
  try {
    const dichvuResult = await db.query(
      "SELECT * FROM DICHVU WHERE TinhTrang = 'Còn phục vụ'"
    );
    const dichvuOptions = dichvuResult.rows;
    res.render("user/dattiec/themdichvu.ejs", { dichvuOptions: dichvuOptions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/douserthemdichvu", async (req, res) => {
  let checkboxes = req.body.checkboxes;
  let ghichudichvu = req.body.ghichudichvu;
  let soluongdichvu = req.body.soluongdichvu;

  console.log(ghichudichvu);
  console.log(soluongdichvu);
  // const ghichu = req.body.;
  // console.log("value checkboxes: ");
  // console.log(typeof checkboxes);
  // console.log("value", checkboxes, "end");
  const dichvuResult = await db.query(
    "SELECT * FROM dichvu WHERE TinhTrang = 'Còn phục vụ'"
  );
  const dichvuOptions = dichvuResult.rows;
  if (typeof checkboxes == "string") {
    checkboxes = checkboxes.split(" ").join("");
    if (!listdichvu.includes(checkboxes)) {
      listdichvu.push(checkboxes);
      listghichudichvu.push(ghichudichvu[checkboxes]);
      listsoluongdichvu.push(soluongdichvu[checkboxes]);
    }
  } else if (typeof checkboxes == "object") {
    for (let i = 0; i < checkboxes.length; i++) {
      let value = checkboxes[i];
      // checkboxes[i] = value.split(" ").join("");
      console.log(checkboxes[i]);
    }

    for (let i = 0; i < checkboxes.length; i++) {
      if (!listdichvu.includes(checkboxes[i])) {
        listdichvu.push(checkboxes[i]);
        listghichudichvu.push(ghichudichvu[checkboxes[i]]);
        listsoluongdichvu.push(soluongdichvu[checkboxes[i]]);
      }
    }
  }
  const monanResult = await db.query(
    "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
  );
  const monanOptions = monanResult.rows;
  let list1 = [];
  for (let i = 0; i < listmonan.length; i++) {
    const result = await db.query("SELECT * FROM monan WHERE mamonan = $1", [
      monanOptions[listmonan[i]].mamonan,
    ]);
    list1.push(result.rows[0]);
  }
  let list2 = [];
  // for (let i = 0; i < checkboxes.length; i++) {
  //   if (!listdichvu.includes(checkboxes[i])) {
  //     listghichudichvu.push(checkboxes[i]);
  //   }
  // }
  // for (let i = 0; i < checkboxes.length; i++) {
  //   if (!listdichvu.includes(checkboxes[i])) {
  //     listdichvu.push(checkboxes[i]);
  //   }
  // }
  for (let i = 0; i < listdichvu.length; i++) {
    const result = await db.query("SELECT * FROM dichvu WHERE madichvu = $1", [
      dichvuOptions[listdichvu[i]].madichvu,
    ]);
    list2.push(result.rows[0]);
  }

  console.log(list2);
  try {
    const caResult = await db.query(
      "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
    );
    const caOptions = caResult.rows;
    const sanhResult = await db.query(
      "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
    );
    const sanhOptions = sanhResult.rows;
    res.render("user/dattiec/dattiec.ejs", {
      caOptions: caOptions,
      sanhOptions: sanhOptions,
      listmonan: list1,
      listghichu: listghichu,
      listsoluongmon: listsoluongmon,
      listdichvu: list2,
      listghichudichvu: listghichudichvu,
      listsoluongdichvu: listsoluongdichvu,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/userxoamonan", async (req, res) => {
  res.render("user/dattiec/XoaMonAn.ejs");
});

app.post("/userxoamonan", async (req, res) => {
  const mamonan = req.body.valuexoa;

  console.log("value xoa", mamonan);
  listghichu.splice(mamonan, 1);
  listsoluongmon.splice(mamonan, 1);
  listmonan.splice(mamonan, 1);
  const monanResult = await db.query(
    "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
  );
  const monanOptions = monanResult.rows;
  let list1 = [];
  for (let i = 0; i < listmonan.length; i++) {
    const result = await db.query("SELECT * FROM monan WHERE mamonan = $1", [
      monanOptions[listmonan[i]].mamonan,
    ]);
    list1.push(result.rows[0]);
  }
  const dichvuResult = await db.query(
    "SELECT * FROM dichvu WHERE TinhTrang = 'Còn phục vụ'"
  );
  const dichvuOptions = dichvuResult.rows;
  let list2 = [];
  for (let i = 0; i < listdichvu.length; i++) {
    const result = await db.query("SELECT * FROM dichvu WHERE madichvu = $1", [
      dichvuOptions[listdichvu[i]].madichvu,
    ]);
    list2.push(result.rows[0]);
  }
  const caResult = await db.query(
    "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
  );
  const caOptions = caResult.rows;
  const sanhResult = await db.query(
    "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
  );
  const sanhOptions = sanhResult.rows;
  res.render("user/dattiec/dattiec.ejs", {
    caOptions: caOptions,
    sanhOptions: sanhOptions,
    listmonan: list1,
    listghichu: listghichu,
    listsoluongmon: listsoluongmon,
    listdichvu: list2,
    listghichudichvu: listghichudichvu,
    listsoluongdichvu: listsoluongdichvu,
  });
});

app.post("/userxoadichvu", async (req, res) => {
  const madichvu = req.body.valuexoadichvu;

  console.log("value xoa", madichvu);
  listghichudichvu.splice(madichvu, 1);
  listsoluongdichvu.splice(madichvu, 1);
  listdichvu.splice(madichvu, 1);
  const dichvuResult = await db.query(
    "SELECT * FROM dichvu WHERE TinhTrang = 'Còn phục vụ'"
  );
  const dichvuOptions = dichvuResult.rows;
  let list2 = [];
  for (let i = 0; i < listdichvu.length; i++) {
    const result = await db.query("SELECT * FROM dichvu WHERE madichvu = $1", [
      dichvuOptions[listdichvu[i]].madichvu,
    ]);
    list2.push(result.rows[0]);
  }
  const monanResult = await db.query(
    "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
  );
  const monanOptions = monanResult.rows;
  let list1 = [];
  for (let i = 0; i < listmonan.length; i++) {
    const result = await db.query("SELECT * FROM monan WHERE mamonan = $1", [
      monanOptions[listmonan[i]].mamonan,
    ]);
    list1.push(result.rows[0]);
  }
  const caResult = await db.query(
    "SELECT * FROM CA WHERE TinhTrang = 'Còn phục vụ'"
  );
  const caOptions = caResult.rows;
  const sanhResult = await db.query(
    "SELECT * FROM SANH WHERE TinhTrang = 'Còn phục vụ'"
  );
  const sanhOptions = sanhResult.rows;
  res.render("user/dattiec/dattiec.ejs", {
    caOptions: caOptions,
    sanhOptions: sanhOptions,
    listmonan: list1,
    listghichu: listghichu,
    listsoluongmon: listsoluongmon,
    listdichvu: list2,
    listghichudichvu: listghichudichvu,
    listsoluongdichvu: listsoluongdichvu,
  });
});

app.post("/xacnhandattiec", async (req, res) => {
  // const confirmDT = req.body.confirmDT;
  const tenchure = req.body.groomName;
  const tencodau = req.body.brideName;
  const maca = req.body.ca;
  const masanh = req.body.sanh;
  const phone = req.body.phone;
  const soluongban = req.body.tableQuantity;
  const ngaydaitiec = req.body.partyDate;
  const tiendatcoc = req.body.deposit;
  const sobandutru = req.body.tableCount;
  const date = new Date();
  const homdattiec = date.getDate();
  let thangdattiec = date.getMonth();
  thangdattiec = thangdattiec + 1;
  const namdattiec = date.getFullYear();
  if (parseInt(thangdattiec) < 10) {
    thangdattiec = "0" + thangdattiec.toString();
  }
  const ngaydattiec = namdattiec + "-" + thangdattiec + "-" + homdattiec;
  console.log("masanh", masanh, "alo");

  try {
    let viphamtruocngay = false;
    if (ngaydaitiec < ngaydattiec) {
      console.log(ngaydaitiec);
      console.log(ngaydattiec);
      viphamtruocngay = true;
      console.log("vi pham");
    }
    console.log("aaa ", ngaydaitiec);
    let trungngay = false;
    let cacphieudattiec = await db.query("SELECT * FROM PHIEUDATTIEC");
    cacphieudattiec = cacphieudattiec.rows;
    for (let i = 0; i < cacphieudattiec.length; i++) {
      let ngay = cacphieudattiec[i].ngaydaitiec;
      let formattedDate = new Date(ngay).toISOString().slice(0, 10);
      let str = formattedDate.toString();
      console.log("helo", str.substr(8, 10));
      let inti = parseInt(str.substr(8, 10));

      inti++;
      let str1 = "";
      if (inti < 10) {
        str1 = str.substr(0, 9) + inti.toString();
      } else {
        str1 = str.substr(0, 8) + inti.toString();
      }
      console.log("helo", str1);
      let macakiemtra = cacphieudattiec[i].maca;
      let masanhkiemtra = cacphieudattiec[i].masanh;

      if (
        macakiemtra == maca &&
        masanhkiemtra == masanh &&
        str1 == ngaydaitiec
      ) {
        console.log("lamdung ruoi");
        trungngay = true;
      }
    }

    if (!trungngay) {
      if (!viphamtruocngay) {
        const monanResult = await db.query(
          "SELECT * FROM MONAN WHERE TinhTrang = 'Còn phục vụ'"
        );
        const monanOptions = monanResult.rows;
        let list1 = [];
        for (let i = 0; i < listmonan.length; i++) {
          const result = await db.query(
            "SELECT * FROM monan WHERE mamonan = $1",
            [monanOptions[listmonan[i]].mamonan]
          );
          list1.push(result.rows[0]);
        }
        const dichvuResult = await db.query(
          "SELECT * FROM dichvu WHERE TinhTrang = 'Còn phục vụ'"
        );
        const dichvuOptions = dichvuResult.rows;
        let list2 = [];
        for (let i = 0; i < listdichvu.length; i++) {
          const result = await db.query(
            "SELECT * FROM dichvu WHERE madichvu = $1",
            [dichvuOptions[listdichvu[i]].madichvu]
          );
          list2.push(result.rows[0]);
        }
        let dongiaban = 0;
        let tongtienban = 0;

        for (let i = 0; i < list1.length; i++) {
          console.log("gia ", parseInt(list1[i].dongia));
          console.log(typeof parseInt(list1[i].dongia));
          console.log("soluong ", parseInt(listsoluongmon[i]));
          console.log(typeof parseInt(listsoluongmon[i]));
          dongiaban += parseInt(list1[i].dongia) * parseInt(listsoluongmon[i]);
        }
        tongtienban +=
          dongiaban * (parseInt(soluongban) + parseInt(sobandutru));
        console.log("tongtienban ", tongtienban);
        console.log(list1);

        const result = await db.query(
          "INSERT INTO PHIEUDATTIEC (TenChuRe, TenCoDau, SDT, NgayDatTiec, NgayDaiTiec, MaSanh, MaCa, TienDatCoc, SoLuongBan, SoBanDuTru, DonGiaBan, TongTienBan) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;",
          [
            tenchure,
            tencodau,
            phone,
            ngaydattiec,
            ngaydaitiec,
            masanh,
            maca,
            tiendatcoc,
            soluongban,
            sobandutru,
            dongiaban,
            tongtienban,
          ]
        );
        const abc = await db.query(
          "SELECT * FROM PHIEUDATTIEC WHERE SoPhieuDatTiec = (SELECT MAX(SoPhieuDatTiec) FROM PHIEUDATTIEC);"
        );
        let sophieu = abc.rows[0];
        console.log(sophieu);
        for (let i = 0; i < list1.length; i++) {
          const result2 = await db.query(
            "INSERT INTO CHITIETMONAN (MaMonAn, SoPhieuDatTiec, SoLuong, DonGia, ThanhTien, GhiChu)	VALUES ($1, $2, $3, $4, $5, $6)",
            [
              list1[i].mamonan,
              sophieu.sophieudattiec,
              listsoluongmon[i],
              list1[i].dongia,
              parseInt(listsoluongmon[i]) * parseInt(list1[i].dongia),
              list1[i].ghichu,
            ]
          );
        }
        let TongTienDichVu = 0;
        let TongTienHoaDon = 0;

        for (let i = 0; i < list2.length; i++) {
          TongTienDichVu +=
            parseInt(list2[i].dongia) * parseInt(listsoluongdichvu[i]);
          const result2 = await db.query(
            "INSERT INTO CHITIETDICHVU (MaDichVu, SoPhieuDatTiec, SoLuong, DonGia, ThanhTien, GhiChu)	VALUES ($1, $2, $3, $4, $5, $6)",
            [
              list2[i].madichvu,
              sophieu.sophieudattiec,
              listsoluongdichvu[i],
              list2[i].dongia,
              parseInt(listsoluongdichvu[i]) * parseInt(list2[i].dongia),
              list2[i].ghichu,
            ]
          );
        }
        TongTienHoaDon = TongTienDichVu + tongtienban;
        let conlai = TongTienHoaDon - parseInt(tiendatcoc);
        const result2 = await db.query(
          "INSERT INTO HOADON (SoPhieuDatTiec, NgaylapHoaDon, NgayThanhToan, TongTienDichVu, TongTienHoaDon, PhiThanhToanTre, ConLai, TinhTrang)	VALUES 	( $1, $2, $3, $4, $5, 0, $6, $7)",
          [
            sophieu.sophieudattiec,
            ngaydaitiec,
            ngaydaitiec,
            TongTienDichVu,
            TongTienHoaDon,
            conlai,
            "Chưa thanh toán",
          ]
        );
        listmonan = [];
        listghichu = [];
        listsoluongmon = [];
        listdichvu = [];
        listghichudichvu = [];
        listsoluongdichvu = [];
        res.redirect("/main");
      } else {
        viphamtruocngay = false;
        trungngay = false;
        res.send("Ngày đãi tiệc phải trước ngày hôm nay");
      }
    } else {
      viphamtruocngay = false;
      trungngay = false;
      res.send("Ngày đãi tiệc bị trùng với tiệc cưới khác");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/haha", async (req, res) => {});

app.post("/haha", async (req, res) => {
  // const abc = await db.query(
  //   "SELECT * FROM PHIEUDATTIEC WHERE tenchure = $1, tencodau = $2, sdt= $3, masanh = $4 RETURNING *;",
  //   ["Võ Vũ Trường Giang", "Trần Thị Nhã Phương", "0946139641", "001"]
  // );
  // let sophieu = abc.rows[0];
  // console.log(sophieu);
  const cacphieudattiec = await db.query("SELECT * FROM PHIEUDATTIEC");
  let ngay = cacphieudattiec.rows[0].ngaydaitiec;
  ngay = ngay.substr(0, 11);
});

app.post("/createuser", async (req, res) => {
  res.render("admin/createuser.ejs");
});

app.post("/create_user", async (req, res) => {
  try {
    const username = req.body.username;
    const loginame = req.body.tendangnhap.trim();
    const email = req.body.email;
    const sdt = req.body.SDT;
    const quyen = req.body.quyen;
    const TDN = await db.query("SELECT tendangnhap FROM nguoidung");
    const TDNExists = TDN.rows.some(
      (row) => row.tendangnhap.trim() === loginame
    );
    if (TDNExists) {
      res.send("Tên đăng nhập đã tồn tại!");
      return;
    }
    const result = await db.query(
      "INSERT INTO nguoidung (TenDangNhap, MatKhau, TenNguoiDung, MaNhom, Email, SDT) VALUES($1,'uit@123', $2, $3, $4, $5) RETURNING *;",
      [loginame, username, quyen, email, sdt]
    );
    const table = await db.query("SELECT * FROM nguoidung");

    res.render("admin/main.ejs", { table: table.rows });
  } catch (err) {
    console.log(err);
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
  res.redirect("/adminmain");
});

app.post("/thaydoithongtin", async (req, res) => {
  const tendangnhap = req.body.username;
  console.log(tendangnhap);
  const user = await db.query(
    "SELECT * from nguoidung WHERE tendangnhap = $1",
    [tendangnhap]
  );
  console.log(user.rows[0]);
  res.render("user/changeinfo/changeinfo.ejs", {
    user: user.rows[0],
  });
});

app.post("/confirminfochange", async (req, res) => {
  const { hovaten, email, sdt, username } = req.body;
  console.log("username", username);
  let errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push({ msg: "Email không đúng định dạng" });
  }
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (!phoneRegex.test(sdt)) {
    errors.push({ msg: "Số điện thoại không đúng định dạng của Việt Nam" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const result = await db.query(
      "UPDATE nguoidung SET TenNguoiDung = $1, Email= $2, sdt = $3 WHERE TenDangNhap=$4;",
      [hovaten, email, sdt, username]
    );
    const result2 = await db.query(
      "SELECT * FROM NGUOIDUNG WHERE TenDangNhap = $1",
      [username]
    );
    userprofile = result2.rows[0];
    res.render("user/main.ejs", {
      name: username,
      email: email,
      hovaten: hovaten,
      sdt: sdt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/thaydoimatkhau", async (req, res) => {
  const tendangnhap = req.body.username;
  console.log(tendangnhap);
  const user = await db.query(
    "SELECT * from nguoidung WHERE tendangnhap = $1",
    [tendangnhap]
  );
  console.log(user.rows[0]);
  res.render("user/changeinfo/changepassword.ejs", {
    user: user.rows[0],
  });
});

app.post("/confirmpasschange", async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  const usernamepass = req.body.usernamepass;
  if (newPassword !== confirmPassword) {
    return res.status(400).send("New passwords do not match");
  }
  // if (newPassword !== confirmPassword) {
  //   return res
  //     .status(400)
  //     .send("New passwords and confirmPassword are not the same thing.");
  // }
  try {
    const result = await db.query(
      "SELECT MatKhau FROM NGUOIDUNG WHERE TenDangNhap = $1",
      [usernamepass]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(user);
      const dbpassword = user.matkhau;
      if (currentPassword === dbpassword) {
        await db.query(
          "UPDATE NGUOIDUNG SET MatKhau = $1 WHERE TenDangNhap = $2",
          [newPassword, usernamepass]
        );
      } else {
        return res.status(400).send("Current password is incorrect");
      }
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
  res.redirect("/main");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
