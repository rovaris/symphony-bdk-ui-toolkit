import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../misc/text';
import Button from '../../misc/button';
import { CloseButton } from '../../misc/button/icon-buttons';
import Box from '../box';
import { ModalConsumer } from './modal-context';
import { Overlay, Modal } from './theme';

const TITLE_PADDING = {
  small: '10px 6px',
  regular: '12px 16px',
  large: '20px 16px',
};

const Padder = styled.div`
  padding: 28px;
`;

const CloseContainer = styled.div`
  margin-right: 16px;
`;

const FloatingCloseContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey_100};
  background-color: ${({ theme, filledTitle }) => (filledTitle ? theme.colors.grey_100 : 'none')};
`;
const TextWrapper = styled.div`
  padding: ${({ titleSize }) => TITLE_PADDING[titleSize]};
`;
const ModalTitle = styled(Text)`
  color: ${({ theme, filledTitle }) => (filledTitle ? theme.colors.grey_800 : theme.colors.grey_700)};
`;

const Close = (props) => {
  const { clickHandler } = props;

  return (
    <IconContainer onClick={clickHandler}>
      <CloseButton />
    </IconContainer>
  );
};

export const TitleBar = (props) => {
  const {
    titleSize = 'regular',
    hasClose = true,
    modalTitle,
    filledTitle,
  } = props;

  if (!modalTitle) {
    if (!hasClose) {
      return null;
    }
    return (
      <FloatingCloseContainer>
        <Close {...props} />
      </FloatingCloseContainer>
    );
  }

  return (
    <TitleContainer filledTitle={filledTitle}>
      <TextWrapper titleSize={titleSize}>
        <ModalTitle isTitle size={titleSize} filledTitle={filledTitle}>
          {modalTitle}
        </ModalTitle>
      </TextWrapper>
      {hasClose && (
        <CloseContainer>
          <Close {...props} />
        </CloseContainer>
      )}
    </TitleContainer>
  );
};
TitleBar.propTypes = {
  titleSize: PropTypes.oneOf(['small', 'regular', 'large']),
  hasClose: PropTypes.bool,
  modalTitle: PropTypes.string,
  filledTitle: PropTypes.bool,
};
TitleBar.defaultProps = {
  hasClose: true,
  filledTitle: false,
  modalTitle: null,
  titleSize: 'regular',
};

const ModalRoot = ({ theme }) => (
  <ModalConsumer>
    {({
      component: Component, props, modalProps, hideModal,
    }) => (
      <Overlay open={!!Component}>
        <Modal theme={theme} open={!!Component} {...modalProps}>
          <TitleBar {...modalProps} clickHandler={hideModal} />
          <Padder>
            {Component ? <Component {...props} hideModal={hideModal} /> : null}
          </Padder>
        </Modal>
      </Overlay>
    )}
  </ModalConsumer>
);

ModalRoot.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ModalRoot);

export const ThemelessDangerConfirmationModal = (props) => {
  const {
    message,
    modalTitle,
    hideModal,
    confirmationHandler,
    confirmButtonText,
  } = props;

  return (
    <Box align="center">
      <Text isTitle>{modalTitle}</Text>
      <Text>{message}</Text>
      <Box horizontal>
        <Button
          fill="outlined"
          type="danger"
          onClick={hideModal}
          title="Cancel"
        >
          Cancel
        </Button>
        <Button
          type="danger"
          onClick={confirmationHandler}
          title="Confirm action"
        >
          {confirmButtonText}
        </Button>
      </Box>
    </Box>
  );
};

ThemelessDangerConfirmationModal.propTypes = {
  message: PropTypes.string,
  modalTitle: PropTypes.string,
  confirmButtonText: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  confirmationHandler: PropTypes.func.isRequired,
};

ThemelessDangerConfirmationModal.defaultProps = {
  modalTitle: 'Are you sure?',
  confirmButtonText: 'Yes',
  message: 'This action cannot be undone.',
};

export const DangerConfirmationModal = withTheme(
  ThemelessDangerConfirmationModal,
);
