package com.delightkitchen.dtos;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BillDTO {

	private int billOrderId;
	private int billCashierId;
	private float taxAndCharge = 5.0f;
	private float discount;
	private float billAmount;
	private float billTotal;
	private Date billDate;
	private String billPaymentMethod;
	private String billStatus = "InProcess";

	public BillDTO(int billOrderId, int billCashierId, float taxAndCharge, float discount, float billAmount,
			Date billDate, String billPaymentMethod, String billStatus) {
		super();
		this.billOrderId = billOrderId;
		this.billCashierId = billCashierId;
		this.taxAndCharge = taxAndCharge;
		this.discount = discount;
		this.billAmount = billAmount;
		this.billDate = billDate;
		this.billPaymentMethod = billPaymentMethod;
		this.billStatus = billStatus;
	}

	@Override
	public String toString() {
		return String.format(
				"BillDTO [billOrderId=%s, billCashierId=%s, taxAndCharge=%s, discount=%s, billAmount=%s, billDate=%s, billPaymentMethod=%s, billStatus=%s]",
				billOrderId, billCashierId, taxAndCharge, discount, billAmount, billDate, billPaymentMethod,
				billStatus);
	}

}
