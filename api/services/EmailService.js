import mail from '@sendgrid/mail';

/**
 *  sendAlert - it is a function that send email to user
 *  @param {object} data it contains receiver email and products
 */
export const sendAlert = ({ from, products }) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const dynamic_template_data = {
    productDescription1: `${products[0].title} / USD $${products[0].price}`,
    productDescription2: `${products[1].title} / USD $${products[1].price}`,
    productDescription3: `${products[2].title} / USD $${products[2].price}`,
    productImage1: products[0].image,
    productImage2: products[1].image,
    productImage3: products[2].image
  };

  const msg = {
    to: 'gabrielfurlan05@gmail.com',
    from,
    subject: 'Novas atualizações de preços',
    templateId: 'd-885c049db094414c8a56b299beece9a0',
    dynamic_template_data
  };
  
  mail.send(msg);
}
