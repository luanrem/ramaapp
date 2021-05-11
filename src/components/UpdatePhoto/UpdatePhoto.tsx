import { useCallback, useRef, useState } from 'react'
import { Avatar, Button } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CancelIcon from '@material-ui/icons/Cancel'
import DoneIcon from '@material-ui/icons/Done'

import ButtonComponent from '../Button/Button'

import { Container, SecondButtons } from './styles'
import { useAuth } from '../../hooks/auth'

export default function UpdatePhoto({ selectedId, setSelectedId }) {
  const [pictureFile, setPictureFile] = useState({
    file: null,
    url: null
  })
  const [imageSelected, setImageSelected] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { updateProfilePicture, photoURL } = useAuth()

  const handleClick = useCallback(() => {
    setSelectedId(null)
  }, [])

  const handleCancelButton = useCallback(() => {
    setImageSelected(false)
  }, [setPictureFile, setImageSelected])

  const onInputClick = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setPictureFile({
          file,
          url: reader.result
        })
      }
    }
    if (file) {
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const handleSelectImage = useCallback(() => {
    inputRef.current.click()
    // inputRef.current.onchange()
    console.log('inputCurrent', inputRef.current.removeEventListener)
    setImageSelected(true)
  }, [inputRef, setImageSelected])

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('files', pictureFile.file)

    updateProfilePicture(formData)

    setSelectedId(null)
  }

  return (
    <AnimatePresence>
      {selectedId && (
        <Container>
          <motion.div
            className="card"
            layoutId={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            style={{ pointerEvents: 'auto' }}
          >
            <Button className="closeIcon" onClick={handleClick}>
              <CancelOutlinedIcon fontSize="large" />
            </Button>
            {pictureFile ? (
              <Avatar src={pictureFile.url} className="avatar" />
            ) : (
              <Avatar src={photoURL} alt="Profile Image" className="avatar" />
            )}

            <input
              ref={inputRef}
              onChange={onInputClick}
              type="file"
              // accept="images/*"
              style={{ display: 'none' }}
              multiple={false}
            />

            {imageSelected ? (
              <SecondButtons>
                <ButtonComponent
                  className="secondButtons cancel"
                  onClick={handleCancelButton}
                >
                  <CancelIcon />
                  Cancelar
                </ButtonComponent>
                <ButtonComponent
                  className="secondButtons ok"
                  onClick={handleSubmit}
                >
                  <DoneIcon />
                  OK
                </ButtonComponent>
              </SecondButtons>
            ) : (
              <ButtonComponent
                className="selectImageButton"
                onClick={handleSelectImage}
              >
                Selecionar Imagem
              </ButtonComponent>
            )}
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  )
}
