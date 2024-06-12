
"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { uploadImage } from "@/lib/fileAction"
import { FileState, ImageState } from "@/lib/fileStates"
import { ChangeEvent, useEffect, useState } from "react"
import { useFormState } from "react-dom"
import UploadButton from "./uploadBtn"
import { toast } from "sonner"


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

const ImageUpload = () => {
  const initialState: ImageState = { data: {}, errors: {} }
  const [state, dispatch] = useFormState(uploadImage, initialState)
  const [fileName, setFileName] = useState<string>("No File selected")

  const selectHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("No File selected")
    }
  }

  useEffect(() => {
    if (state.data?.message && state.data?.message === "success") {
      toast("Image uploaded successfully")
    }
    if (state.errors?.image) {
      toast(state.errors.image)
    }
    if (state.errors?.caption) {
      toast(state.errors.caption)
    }
    if (state.errors?.description) {
      toast(state.errors.description)
    }
  }, [state.data, state.errors])

  return (
    <section>
      <div className="flex flex-col items-center justify-center h-[600px] gap-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Upload Your Image</h2>
          <p className="text-gray-500 dark:text-gray-400">Click the Icon below to select.</p>
        </div>
        <form action={dispatch} className="w-[400px]">
          <div className="flex flex-col items-center justify-center w-full max-w-md space-y-4">
            <label
              className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-400"
              htmlFor="image"
            >
              <UploadIcon className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Browse images to upload</span>
              <input className="sr-only" id="image" name="image" type="file" accept="image/*" onChange={selectHandler} />
            </label>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Selected image: {fileName}</div>
            <div>

              <div className="flex gap-4 items-center my-2 mx-4">
                <Label htmlFor="caption" className="text-black"> Caption
                </Label>
                <Input type="text" id="caption" name="caption" className="self-end" />
              </div>
              <div className="flex gap-4 items-center mx-4 my-2">
                <Label htmlFor="description">
                  Description
                </Label>
                <Input type="text" id="description" name="description" className="self-end" />
              </div>
            </div>
            <UploadButton />
          </div>
        </form>
      </div>
    </section>
  )
}

export default ImageUpload
