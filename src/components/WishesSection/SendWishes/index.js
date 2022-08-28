import React, { useState, Fragment } from 'react';
import { Link } from 'gatsby';
//import { saveAs } from 'file-saver';

function SendWishes() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [imageFilename, setImageFilename] = useState();
  const [infoName, setInfoName] = useState();
  const [wishes, SetWishes] = useState();

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetImage = (e) => {
    setImageFilename(e.target.value);
    //dua2nya bisa dipakai
//    var file = document.querySelector('input[type="file"]').files[0];
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result)
    };
    var showImage = document.getElementById('showImage');
    if (file) {
      showImage.src = URL.createObjectURL(file)
    }
  };

  const handleSetInfoName = (e) => {
    setInfoName(e.target.value);
  };

  const handleSetWishes = (e) => {
    SetWishes(e.target.value);
  };

  const handleWishesData = async () => {
    if (!name || !infoName || !wishes){
        alert('silahkan lengkapi data !');
    } else {
      try {
        const params = {
            'name': name,
            'description': infoName,
            'wishes': wishes,
            'image': image,
            'image_filename': imageFilename,
        }
        let url = 'http://localhost:8013/wishes?' + ( new URLSearchParams( params ) ).toString();
        await fetch(url, { mode: 'no-cors'}, {
            method: 'GET'
        });
        alert('berhasil dikirim');
      } catch (err) {
        alert('gagal kirim');
      }
    }
  };

  return (
    <div>
      <h2 className="title">Kirim Ucapan Untuk Calon Mempelai</h2>
      <h3 className="title__sub">Arin & Miftah Wedding</h3>

      <Fragment>
        <form>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div class="form-group">
                <label for="name">Nama</label>
                <input
                  value={name}
                  onChange={handleSetName}
                  type="text"
                  name='name'
                  class="form-control"
                  placeholder=""
                  required
                ></input>
              </div>
              <div class="form-group">
                <label for="image">Foto (Optional)</label>
                <input
                  value={imageFilename}
                  onChange={handleSetImage}
                  type="file"
                  class="form-control-file"
                  id="img"
                  accept="image/*"
                ></input>
                <br></br>
                <img id="showImage" src='#' alt="foto" width="200px" height="200px"/>
              </div>
              <div class="form-group">
                <label for="infoName">Keterangan</label>
                <input
                  value={infoName}
                  onChange={handleSetInfoName}
                  type="text"
                  class="form-control"
                  placeholder="misal: Teman SMP Arin"
                  required
                ></input>
              </div>
              <div class="form-group">
                <label for="wishes">Ucapan</label>
                <textarea
                    value={wishes}
                    onChange={handleSetWishes}
                    rows="5"
                    cols="60"
                    class="form-control"
                    placeholder="Tulis ucapan"
                    required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary" onClick={() => handleWishesData()}>
                Kirim
              </button>
              <br></br>
              <br></br>
              <Link to={`/`}>
                <button className="btn primary">{`< Kembali ke Homepage`}</button>
              </Link>
              <br></br>
              <br></br>
              <div class="tinfo">Note:</div>
              <div class="tdata additional">
                <ul style={{ paddingLeft: '16px' }}>
                  <li>
                    Ucapan ini akan ditampilkan di halaman depan, tapi tidak realtime (ada jeda waktu)
                  </li>
                </ul>
                <br />
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    </div>
  );
}

export default SendWishes;
