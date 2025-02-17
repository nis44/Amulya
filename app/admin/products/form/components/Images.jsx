export default function Images({
  data,
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
}) {
  const handleMultipleImages = (e) => {
    const newFiles = Array.from(e.target.files);
    setImageList(prev => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setImageList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col gap-4 bg-white border-[#EBD1C4] p-5 rounded-xl shadow-sm">
      <h1 className="text-lg font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-2">
        Visual Gallery
      </h1>

      {/* Feature Image Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
          Hero Image <span className="text-red-500">*</span>
        </label>
        
        <div className="relative group border-2 border-dashed border-[#EBD1C4] rounded-xl hover:border-[#5E121D] transition-colors">
          <label 
            htmlFor="product-feature-image"
            className="cursor-pointer block p-4"
          >
            {(data?.featureImageURL || featureImage) ? (
              <div className="relative">
                <img
                  className="h-48 w-full object-contain rounded-lg"
                  src={featureImage ? URL.createObjectURL(featureImage) : data?.featureImageURL}
                  alt="Featured jewelry"
                />
                <div className="absolute inset-0 bg-[#5E121D]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <span className="text-white font-medium">Change Hero Image</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-[#5E121D]/50">
                <span className="text-4xl">+</span>
                <p className="mt-2">Upload Hero Image</p>
                <p className="text-xs">Recommended ratio: 1:1</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="product-feature-image"
            className="hidden"
            onChange={(e) => e.target.files[0] && setFeatureImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Additional Images Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
          Gallery Images <span className="text-red-500">*</span>
        </label>
        
        <div className="border-2 border-dashed border-[#EBD1C4] rounded-xl hover:border-[#5E121D] transition-colors">
          <label 
            htmlFor="product-images"
            className="cursor-pointer block p-4"
          >
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {/* Existing Images */}
              {data?.imageList?.map((item, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={item}
                    alt={`Jewelry view ${index + 1}`}
                  />
                </div>
              ))}

              {/* New Images */}
              {imageList?.map((item, index) => (
                <div key={index} className="relative aspect-square group">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={URL.createObjectURL(item)}
                    alt={`New image ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-[#5E121D] text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              <div className="aspect-square flex items-center justify-center border-2 border-[#EBD1C4] rounded-lg hover:border-[#5E121D] transition-colors">
                <div className="text-center text-[#5E121D]/50">
                  <span className="text-2xl">+</span>
                  <p className="text-xs mt-1">Add Images</p>
                </div>
              </div>
            </div>
          </label>
          <input
            type="file"
            id="product-images"
            multiple
            onChange={handleMultipleImages}
            className="hidden"
          />
        </div>
        
        <p className="text-xs text-[#8A1A2B] mt-2">
          {imageList?.length + (data?.imageList?.length || 0)} images selected
        </p>
      </div>

      <div className="text-sm text-[#5E121D]/80 pt-2 border-t border-[#EBD1C4]">
        <p className="font-medium">Image Guidelines:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Minimum 3 images required</li>
          <li>Use high-resolution images (min 2000px width)</li>
          <li>Include different angles and close-ups</li>
        </ul>
      </div>
    </section>
  );
}
