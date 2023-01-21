import {
  Container,
  Box,
  Text,
  Heading,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Features from './Features';
import PreviewBox from './PreviewBox';
import Search from './Search';
import Suggestions from './Suggestions';
import { getInfos, getSuggestions } from './utils/API';
import { getDownloadUrl, isYtUrl } from './utils/helpers';

export default function Main() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [input, setInput] = useState('');
  const [isConvertionLoading, setConvertionLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const downloadBtnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (downloadUrl.length && downloadBtnRef?.current) {
      setConvertionLoading(false);
      downloadBtnRef.current.click();
    }
  }, [downloadUrl]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const fetchSuggestions = async () => {
    setError(false);
    setSearchLoading(true);
    try {
      const { data } = await getSuggestions(input);
      setSuggestions(data.data);
      setSearchLoading(false);
    } catch (err) {
      setError(true);
      console.warn(err);
    }
  };
  const handleSearch = async () => {
    const isYouTubeUrl = isYtUrl(input);
    if (!input) {
      setError(true);
      return;
    }
    if (isYouTubeUrl) {
      setError(false);
      setConvertionLoading(true);
      try {
        const { data } = await getInfos(input);
        const {
          data: { videoDetails },
        } = data;
        setCurrentVideo(videoDetails);
        setConvertionLoading(false);
      } catch (err) {
        setError(true);
        setConvertionLoading(false);
      }
    } else {
      fetchSuggestions();
    }
  };
  const chooseFormat = async (format: string, videoId: string) => {
    try {
      await getInfos(videoId);
      const downloadUrl = getDownloadUrl(videoId, format);
      setDownloadUrl(downloadUrl);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <Container maxW="container.md">
        <Box textAlign="center" fontSize="xl">
          <Box mt="16" mb="6">
            <Heading className="special-elite-font" size="1xl">
            Convert your YouTube videos online from Youtube To Mp3 / WAV / MP4 / MOV / FLV for free. Paste your URL here to start :)
            </Heading>
            <small>(Ver.1.1.0)</small>
          </Box>
          <Search
            handleChange={handleChange}
            handleSearch={handleSearch}
            error={error}
            input={input}
            isLoading={
              (isConvertionLoading && !isSearchLoading) ||
              (!isConvertionLoading && isSearchLoading)
            }
          />
          <PreviewBox
            data={currentVideo}
            chooseFormat={chooseFormat}
            isLoading={isConvertionLoading}
          />
        </Box>
        <Suggestions
          data={suggestions}
          chooseFormat={chooseFormat}
          isLoading={isSearchLoading}
        />
      </Container>
      <VisuallyHidden>
        <a href={downloadUrl} download ref={downloadBtnRef}>
          {downloadUrl}
        </a>
      </VisuallyHidden>
    </>
  );
}
