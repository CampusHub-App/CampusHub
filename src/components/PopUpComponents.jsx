export const PopUpBase = ({ isOpen, onClose, children, title, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full mx-4`}>
        <div className="p-6">
          {title && (
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export const PopUpBerhasil = ({ isOpen, onClose, message = "Operasi berhasil dilakukan!" }) => {
  return (
    <PopUpBase isOpen={isOpen} onClose={onClose} title="Berhasil">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Tutup
        </button>
      </div>
    </PopUpBase>
  );
};

export const PopUpGagal = ({ isOpen, onClose, message = "Terjadi kesalahan. Silakan coba lagi." }) => {
  return (
    <PopUpBase isOpen={isOpen} onClose={onClose} title="Gagal">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Tutup
        </button>
      </div>
    </PopUpBase>
  );
};

export const PopUpDelete = ({ isOpen, onClose, onConfirm, message = "Apakah Anda yakin ingin menghapus item ini?" }) => {
  return (
    <PopUpBase isOpen={isOpen} onClose={onClose} title="Konfirmasi Hapus">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
          <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </PopUpBase>
  );
};

export const PopUpLogOut = ({ isOpen, onClose, onConfirm }) => {
  return (
    <PopUpBase isOpen={isOpen} onClose={onClose} title="Konfirmasi Logout">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">Apakah Anda yakin ingin keluar dari akun?</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </PopUpBase>
  );
};

export const PopUpCheckout = ({ isOpen, onClose, onConfirm, eventDetails }) => {
  return (
    <PopUpBase isOpen={isOpen} onClose={onClose} title="Konfirmasi Pendaftaran" maxWidth="max-w-lg">
      <div>
        {eventDetails && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">{eventDetails.title}</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="mb-2"><span className="font-medium">Tanggal:</span> {eventDetails.date}</p>
              <p className="mb-2"><span className="font-medium">Lokasi:</span> {eventDetails.location}</p>
              <p><span className="font-medium">Harga:</span> {eventDetails.price === 0 ? 'Gratis' : `Rp ${eventDetails.price.toLocaleString('id-ID')}`}</p>
            </div>
          </div>
        )}
        
        <p className="text-gray-700 mb-6 text-center">Apakah Anda yakin ingin mendaftar untuk acara ini?</p>
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Daftar
          </button>
        </div>
      </div>
    </PopUpBase>
  );
};