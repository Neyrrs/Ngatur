// components/ui/confirm-dialog.tsx
"use client"

import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
  title: string
  description: string
  onClose: (result: boolean) => void
}

const ConfirmDialogComponent = ({ title, description, onClose }: ConfirmDialogProps) => {
  const [open, setOpen] = useState(true)

  const handleClose = (result: boolean) => {
    setOpen(false)
    onClose(result)
  }

  return (
    <AlertDialog open={open} onOpenChange={(val) => !val && handleClose(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClose(true)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const confirmDialog = (title: string, description: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const container = document.createElement("div")
    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)

    const handleClose = (result: boolean) => {
      resolve(result)
      // Unmount & clean up
      setTimeout(() => {
        root.unmount()
        container.remove()
      }, 0)
    }

    root.render(
      <ConfirmDialogComponent
        title={title}
        description={description}
        onClose={handleClose}
      />
    )
  })
}
