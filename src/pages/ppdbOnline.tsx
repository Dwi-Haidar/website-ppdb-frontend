const ppdbOnline = () => {
    return (
      <div className="faded mt-[18%] md:mt-[13%] lg:mt-[6%] ">
        <div className="text-center mb-6">
          <p className="text-lg font-medium">Silahkan isi formulir berikut</p>
        </div>
        <div className="flex justify-center">
            <form className="bg-white shadow-md rounded-lg p-8 space-y-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Formulir PPDB Online</h2>
    
            <div className="grid grid-cols-1 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input type="text" placeholder="Nama Lengkap" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">NISN</label>
                <input type="text" placeholder="NISN" className="input-field mt-1" />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" placeholder="Email" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Tempat, Tanggal Lahir</label>
                <input type="text" placeholder="Tempat, Tanggal Lahir" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">NIK</label>
                <input type="text" placeholder="NIK" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">No. KK</label>
                <input type="text" placeholder="No. KK" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input type="text" placeholder="Alamat" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Nama Ayah</label>
                <input type="text" placeholder="Nama Ayah" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Tahun Lahir Ayah</label>
                <input type="number" placeholder="Tahun Lahir Ayah" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Pendidikan Ayah</label>
                <input type="text" placeholder="Pendidikan Ayah" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Pekerjaan Ayah</label>
                <input type="text" placeholder="Pekerjaan Ayah" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                <input type="text" placeholder="Nama Ibu" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Tahun Lahir Ibu</label>
                <input type="number" placeholder="Tahun Lahir Ibu" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Pendidikan Ibu</label>
                <input type="text" placeholder="Pendidikan Ibu" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Pekerjaan Ibu</label>
                <input type="text" placeholder="Pekerjaan Ibu" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">Alamat Orang Tua</label>
                <input type="text" placeholder="Alamat Orang Tua" className="input-field mt-1" />
                </div>
    
                <div>
                <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                <input type="text" placeholder="No. Telepon" className="input-field mt-1" />
                </div>
            </div>
    
            <button type="submit" className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Submit</button>
            </form>
        </div>
      </div>
    )
  }
  
  export default ppdbOnline
  