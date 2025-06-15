"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useServices } from "@/services/useService"
import type { AadhaarData } from "../../types/custom"

const ImageUploader = () => {
  const [front, setFront] = useState<File | null>(null)
  const [back, setBack] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<AadhaarData>({})
  const [frontPreview, setFrontPreview] = useState<string | null>(null)
  const [backPreview, setBackPreview] = useState<string | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const { extractText } = useServices()

  const handleSubmit = async () => {
    try {
      if (!validation()) return

      setIsExtracting(true)
      const formData = new FormData()
      formData.append("front", front as File)
      formData.append("back", back as File)

      const response = await extractText(formData)
      setExtractedData({ ...response?.data.data.backText, ...response?.data.data.frontText })
    } catch (error) {
      console.log(`Oop's Something happened`)
    } finally {
      setIsExtracting(false)
    }
  }

  const validation = (): boolean => {
    try {
      if (!front || !back) {
        alert("Please select both front and back images")
        return false
      }

      const files = [front, back]
      const minSize = 50 * 1024
      const maxSize = 10 * 1024 * 1024
      const invalidFile = files.find((file) => file.size < minSize || file.size > maxSize)

      if (invalidFile) {
        alert(`File "${invalidFile.name}" must be between 100KB and 10MB.`)
        return false
      }

      return true
    } catch (error) {
      console.log(`Oop's Something happened`)
      return false
    }
  }

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFront(file)
    if (file) {
      setFrontPreview(URL.createObjectURL(file))
    } else {
      setFrontPreview(null)
    }
  }

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setBack(file)
    if (file) {
      setBackPreview(URL.createObjectURL(file))
    } else {
      setBackPreview(null)
    }
  }

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview)
      if (backPreview) URL.revokeObjectURL(backPreview)
    }
  }, [frontPreview, backPreview])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-2">Aadhaar Card Data Extractor</h1>
          <p className="text-gray-600 text-lg">Upload both sides of your Aadhaar card to extract information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Front Upload */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aadhaar Front Side</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFrontChange}
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              {frontPreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={frontPreview || "/placeholder.svg"}
                      alt="Front preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Back Upload */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aadhaar Back Side</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackChange}
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              {backPreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={backPreview || "/placeholder.svg"}
                      alt="Back preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={isExtracting || !front || !back}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isExtracting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Extracting Data...
                </span>
              ) : (
                "Extract Data"
              )}
            </button>
          </div>
        </div>

        {/* Extracted Data Display */}
        {Object.keys(extractedData).length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Extracted Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <span className="text-lg text-gray-900 font-semibold break-words">{value || "Not available"}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Raw JSON Display (for debugging) */}
            <div className="mt-8">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800 mb-2">
                  View Raw Data (JSON)
                </summary>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">
                    {JSON.stringify(extractedData, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Instructions:</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Upload clear, high-quality images of both sides of your Aadhaar card
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Ensure the text is clearly visible and not blurred
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              File size should be between 50KB and 10MB
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Supported formats: JPG, PNG and other image formats
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
