function Products({ item, item: { id, name, src, category, likes }, like, eliminarPost }) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md col-12 sm:col-4 inline-block mx-0 px-3">
        <img className="w-full h-48 object-cover" src={src} alt={name} />
        <div className="p-3">
          <h4 className="text-lg font-bold mb-2">{name}</h4>
          <p className="text-gray-600 text-sm">{category}</p>
          <div className="flex justify-between items-center">
            <div>
              <i
                onClick={() => like(id)}
                className={`fa-heart fa-xl ${likes ? 'text-red-500' : 'text-gray-400'}`}
              ></i>
              <span className="ms-1">{likes}</span>
            </div>
            <i onClick={() => eliminarPost(id)} className="fa-solid fa-x"></i>
          </div>
        </div>
      </div>
    );
  }
  
  export default Products;