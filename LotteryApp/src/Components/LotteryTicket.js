import React, {Component} from 'react';
import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import {Typography,Divider} from 'antd';

const {Title} = Typography;
class LotteryTicket extends Component {
  render() {
    const {actions, index, color, number} = this.props;
    return (
      <Container fluid="lg">
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: color,
                marginBottom: 15,
              }}
            >
              <Card.Body>
                <Card.Title>
                  <Title level={4}>Билетче номер: {index + 1}</Title>
                </Card.Title>
                <Divider/>
                <Card.Text>
                  <p><Title level={3}>{number}</Title></p>
                </Card.Text>
              </Card.Body>

            
              <Button id="X"
                variant="light"
                style={{width:'80%',margin:'auto',marginBottom:10}}
                size="sm"
                block
                onClick={() => {
                  actions.removeTicket(index);
                }}
              >
                {' '}
                X{' '}
              </Button>
            </Card>{' '}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default LotteryTicket;
