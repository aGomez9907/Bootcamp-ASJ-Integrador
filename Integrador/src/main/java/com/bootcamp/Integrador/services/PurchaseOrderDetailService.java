package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Phone;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.models.PurchaseOrderDetail;
import com.bootcamp.Integrador.repositories.PhoneRepository;
import com.bootcamp.Integrador.repositories.PurchaseOrderDetailRepository;

import jakarta.transaction.Transactional;

@Service
public class PurchaseOrderDetailService {

	@Autowired
	PurchaseOrderDetailRepository purchaseOrderDetailRepository;

	public List<PurchaseOrderDetail> getPurchaseOrderDetails() {
		return purchaseOrderDetailRepository.findAll();
	}

	public Optional<PurchaseOrderDetail> getPurchaseOrderDetailById(Integer id) {
		return purchaseOrderDetailRepository.findById(id);
	}
	
	public List<PurchaseOrderDetail> getPurchaseOrderDetailsByOrderId(Integer id){
		return purchaseOrderDetailRepository.findDetailByOrderId(id);
	}

	@Transactional
	public PurchaseOrderDetail createPurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail) {
		try {
			purchaseOrderDetail.setCreatedAt(Timestamp.from(Instant.now()));
			purchaseOrderDetail.setUpdatedAt(Timestamp.from(Instant.now()));
			purchaseOrderDetail.setDeleted(false);
			PurchaseOrderDetail resultPurchaseOrderDetail = purchaseOrderDetailRepository.save(purchaseOrderDetail);
			return resultPurchaseOrderDetail;
		}catch(Exception e) {
			throw e;
		}
	}

	public String updatePurchaseOrderDetail(Integer id, PurchaseOrderDetail purchaseOrderDetail) {
		try {
			PurchaseOrderDetail purchase = purchaseOrderDetailRepository.findById(id).get();// obtengo la tarea original
			if (purchase != null) {
				purchase.setQuantity(purchaseOrderDetail.getQuantity());
//				purchase.setUnitPrice(purchaseOrderDetail.getUnitPrice());
				purchase.setProductId(purchaseOrderDetail.getProductId());
				purchase.setUpdatedAt(Timestamp.from(Instant.now()));
				purchaseOrderDetailRepository.save(purchase);
				return "PurchaseOrderDetail with id: " + id + " updated successfully.";
			}
			return "Error: The purchaseOrderDetail is null.";

		} catch (Exception err) {
			return "Error: The purchaseOrderDetail couldn´t be found.";
		}

	}

	public PurchaseOrderDetail deletePurchaseOrderDetail(Integer id) {
		try {
			PurchaseOrderDetail purchase =  purchaseOrderDetailRepository.findById(id).get();
			purchase.setDeleted(true);
			purchaseOrderDetailRepository.save(purchase);
			return purchaseOrderDetailRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public PurchaseOrderDetail recoverPurchaseOrderDetail(Integer id) {
		try {
			PurchaseOrderDetail purchase =  purchaseOrderDetailRepository.findById(id).get();
			purchase.setDeleted(false);
			purchaseOrderDetailRepository.save(purchase);
			return purchaseOrderDetailRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
