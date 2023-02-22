import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const MyVerticallyCenteredModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header className='header_pri' closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Privacy Policy
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        In order to protect the legitimate rights and interests of users participating in the presale and maintain the normal operation order of the presale, the rules are formulated in accordance with relevant agreements and rules of national laws and regulations.
                    </p>
                    <h5 className='c_heading'>Chapter 1 Definition</h5>
                    <p>1.1   Presale definition: refers to a sales model in which a merchant provides a product or service plan, gathers consumer orders through presale product tools, and provides goods and / or services to consumers according to prior agreement.</p>
                    <p>1.2   The presale model is a "deposit" model. "Deposit" refers to a fixed amount of presale commodity price pre-delivered. “The deposit” can participate in small games and have the opportunity to win more deposits. The deposit can be directly exchanged for commodities. The deposit is not redeemable.</p>
                    <p>1.3   Presale products: refers to the products released by merchants using presale product tools. Only the presale words are marked on the product title or product details page, and the products that do not use the presale product tools are not presale products.</p>
                    <p>1.4   Presale system: Refers to the system product tools provided to support merchants for presale model sales.</p>
                    <p>1.5   Presale commodity price: refers to the selling price of presale commodity. The price of presale goods is composed of two parts: deposit and final payment.

                    </p>
                    <p>1.6   Presale deposit: Refers to a certain amount of money that consumers pay in advance when purchasing presale goods, which is mainly used as a guarantee to purchase presale goods and determine the purchase quota.</p>
                    <p>1.7   Presale final payment: refers to the amount of money that the consumer still has to pay after the presale commodity price minus the deposit.

                    </p>
                    <h5 className='c_heading'>Chapter 2 Presale management specifications</h5>
                    <p className='c_58'>2.1 Commodity management</p>
                    <p>2.1.1 Presale deposit time: up to 7 days can be set.</p>
                    <p>
                        2.1.3 During the presale of commodities, the system does not support merchants to modify the price of pre-sold commodities (including deposits and balances), but the amount of remaining commodity inventory can be modified according to the actual situation of inventory.

                    </p>
                    <p>2.1.4 To avoid unnecessary disputes, If the presale product is a customized product, the merchant should clearly inform the consumer on the product page of the production cycle and delivery time of the product, and contact the consumer to confirm the delivery standard, delivery time, etc.</p>
                    <p>2.1.5 For customized products, the merchant has not agreed with the consumer on the delivery time and delivery standard, the delivery standard proposed by the consumer is unclear or conflicts and after the merchant places an order, he(she) starts production and delivery without confirming with the consumer, if the consumer initiates a dispute as a result, the platform will treat it as a normal delivery time limit order fulfillment.</p>
                    <p><span className='c_58'>2.2 Transaction management</span></p>
                    <p>2.2.1 Consumers who use the pre-sale system will lock in the pre-sale quota after placing an order for goods. If the pre-sale order is overtime, the system will automatically cancel it.</p>
                    <p>2.2.2 During the presale period, the merchant shall not cancel the presale activities without reason. For presale activities that have generated orders, the merchant must not cancel the order without the consumer ’s consent. If the consumer agrees, the merchant should double return the deposit paid by the consumer; if the consumer does not agree to cancel the order, the merchant should perform the contract according to the order.</p>
                    <p>2.2.3 If the final payment of the presale order is not completed due to consumer reasons, the merchant can deduct the deposit paid by the consumer; if the merchant actively negotiates with the consumer to terminate the order before paying the final payment, the merchant shall double Return the deposit paid by the consumer.</p>
                    <p className='c_58'>2.3 Delivery Management</p>
                    <p>2.3.1 Delivery time limit setting</p>
                    <p>If the merchant sets the delivery time limit through the presale system, it should be shipped within the set time limit.</p>
                    <p>2.3.2 Shipping way</p>
                    <p>The third-party delivery the orders.</p>
                    <p>Customers need to provide your name, address and phone number to facilitate third-party delivery orders.</p>
                    <p className='c_58'>2.4 After-sales management</p>
                    <p>Presale products shall provide after-sales service in accordance with the "Regulations for After-sales Service of Platform Merchants".</p>
                    <b>Explanation</b>
                    <p>Mall transaction mode</p>
                    <p>There are two ways to buy in the mall, one is full purchase, and the other is deposit purchase.</p>
                    <p>In the mode of full purchase, you can place an order directly and purchase goods in full payment.</p>
                    <p>The deposit purchase mode will freeze the customer's deposit, and the customer will take delivery after completing the final payment within 7 days. Users who have paid a deposit will be given an extra point quiz game. According to the analysis of market fluctuations, they have the opportunity to win more points to deduct the payment or send red envelopes to friends.</p>
                    <p>The pre-order model has many benefits for customers. The deposit not only generates an order for the customer, but also gives the customer an equal amount of red envelopes, which can be withdrawn immediately. Although the deposit is not refundable, the red envelope converted from the deposit can be withdrawn without any loss to the customer.</p>
                    <p>一. After the customer pays the deposit and orders, a merchandise order is generated, and the mall began to prepare this order. This deposit cannot be returned. After the customer needs to make up the balance, the mall will ship the goods. If the customer does not make up the balance, the product order will always exist.</p>
                    <p>二. After paying the deposit, the customer will be given a red envelope account with the same amount of deposit.</p>
                    <p>1. The red envelope can be withdrawn directly, so that instead of losing money, the customer has added a commodity order generated by a deposit. And red envelopes can also be given to friends.</p>
                    <b>2. If the customer uses the red envelope account to participate in the game, you can earn more red envelopes, but if the game loses, the red envelope will be gone, but his merchandise order is still there.

                    </b>
                    <br />
                    <br />
                    <p>Note: I have carefully read all contents of this presale management rule, Risk Disclosure Agreement and Risk Agreement and I am agreed to continue with my own risk.

                    </p>





                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MyVerticallyCenteredModal