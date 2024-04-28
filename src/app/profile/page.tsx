import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import routes from '../statics/routes/routes.json';
import server from '../statics/routes/server.json';
import { actionCreators } from '../state';
import MessageSpinner from '../components/utils/MessageSpinner';
import appError from '../utils/appError';

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ProfileInfo {
  name: string;
  email: string;
  images: [Image];
  product: string;
}

const { Img, Body, Text, Title, Subtitle } = Card;

export default function Page() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logout, removeProfile } = bindActionCreators(
    actionCreators,
    dispatch,
  );
  const [information, setInformation] = useState<ProfileInfo>();
  const [errorMessage, setErrorMessage] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);

  const getProfileInfo = useCallback(
    async (token: string) => {
      setDisplayAlert(false);
      try {
        // TODO: Replace with fetch
        const response = await axios.get(server.SPOTIFY_USERS_ME, {
          params: { token },
        });
        const { data } = response;
        const { display_name, images, product, email } = data;
        setInformation({ name: display_name, images, product, email });
      } catch (error) {
        if (appError.isUnauthorized(error)) {
          logout();
          removeProfile();
        }
        setErrorMessage(appError.onError(error));
        setDisplayAlert(true);
      }
    },
    [logout, removeProfile],
  );

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token !== null && !information && !displayAlert) {
      getProfileInfo(token);
    } else if (token === null) {
      history.push(routes.LOGIN);
    }
  }, [history, getProfileInfo, information, displayAlert]);

  if (!information) {
    return <MessageSpinner message="Loading" />;
  }

  const { name, email, product, images } = information;

  return (
    <Container
      style={{
        minHeight: 'calc(100vh - 56px)',
        alignItems: 'center',
        display: 'grid',
        justifyContent: 'center',
      }}
    >
      <Alert
        variant="danger"
        onClose={() => setDisplayAlert(false)}
        show={displayAlert}
        dismissible
      >
        {errorMessage}
      </Alert>
      <Card
        bg="dark"
        border="dark"
        text="secondary"
        className="align-items-center"
        style={{
          padding: 25,
          boxShadow:
            '-10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, -2px 2px 15px 6px rgb(0 0 0 / 0%)',
        }}
      >
        {images.map((image, index) => (
          <Img
            key={`img${index.toString()}`}
            src={image.url}
            alt="avatar"
            style={{ width: 250 }}
          />
        ))}
        <Body style={{ width: '100%' }}>
          <Title style={{ textAlign: 'center' }}>
            <strong>{name}</strong>
          </Title>
          <br />
          <Subtitle>
            <strong>Display Name</strong>
          </Subtitle>
          <Text>{name}</Text>
          <Subtitle>
            <strong>Email</strong>
          </Subtitle>
          <Text>{email}</Text>
          <Subtitle>
            <strong>Subscription</strong>
          </Subtitle>
          <Text>{product}</Text>
        </Body>
      </Card>
    </Container>
  );
};
